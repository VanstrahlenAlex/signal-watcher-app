
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "../db";
import { processEventWithAI } from "../services/aiService";
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';

const watchlistSchema = z.object({
	name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
	terms: z.string().min(1, { message: "Se requiere al menos un término." }),
});

const editWatchlistSchema = z.object({
	id: z.string().min(1, { message: "ID de la watchlist es requerido." }),
	name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
	terms: z.string().min(1, { message: "Se requiere al menos un término." }),
});




export async function createWatchlist(formData: FormData) {
	const data = {
		name: formData.get('name'),
		terms: formData.get('terms'),
	};

	const validation = watchlistSchema.safeParse(data);
	if (!validation.success) {
		return {
			success: false,
			errors: validation.error.flatten().fieldErrors
		};
	}

	const termsArray = validation.data.terms
		.split(',')
		.map(term => term.trim())
		.filter(term => term);

	try {
		const newWatchlist = await db.watchlist.create({
			data: {
				name: validation.data.name,
				terms: termsArray
			}
		});

		revalidatePath("/watchlists");
		return { success: true, watchlist: newWatchlist };
	} catch (error) {
		console.error('Database Error:', error);
		return { success: false, errors: { _global: ["Error al crear la lista de observación."] } };
	}
}


export async function editWatchlist(formData: FormData) {
	const data = {
		id: formData.get('id'),
		name: formData.get('name'),
		terms: formData.get('terms'),
	};

	const validation = editWatchlistSchema.safeParse(data);
	if (!validation.success) {
		return {
			success: false,
			errors: validation.error.flatten().fieldErrors
		};
	}

	const termsArray = validation.data.terms
		.split(',')
		.map(term => term.trim())
		.filter(term => term);

	try {
		const updatedWatchlist = await db.watchlist.update({
			where: { id: validation.data.id },
			data: {
				name: validation.data.name,
				terms: termsArray
			}
		});

		revalidatePath("/watchlists");
		return { success: true, watchlist: updatedWatchlist };
	} catch (error) {
		console.error('Database Error:', error);
		return { success: false, errors: { _global: ["Error al editar la lista de observación."] } };
	}
}


export async function deleteWatchlist(formData: FormData) {
	const id = formData.get('id');

	if (typeof id !== 'string') {
		return { success: false, errors: { _global: ["ID de la watchlist es requerido."] } };
	}

	try {

		await db.event.deleteMany({
			where: { watchlistId: id },
		});

		await db.watchlist.delete({
			where: { id: id },
		});

		revalidatePath("/watchlists");
		return { success: true };
	} catch (error) {
		console.error('Database Error:', error);
		return { success: false, errors: { _global: ["Error al eliminar la lista de observación."] } };
	}
}

export async function getWatchlists() {
	try {
		const watchlists = await db.watchlist.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});
		return watchlists;
	} catch (error) {
		console.error('Database Error:', error);
		return [];
	}
}

export async function searchSignals(formData: FormData) {
	const query = formData.get('query') as string;
	if (!query || query.trim() === '') {
		return { success: false, results: [] };
	}

	try {
		const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
		const data = await response.json();
		type DuckDuckGoTopic = {
			Text: string;
			FirstURL: string;
			// Add other properties if needed
		};

		const results = data.RelatedTopics?.slice(0, 5).map((topic: DuckDuckGoTopic, index: number) => ({
			id: index.toString(),
			title: topic.Text,
			url: topic.FirstURL,
			source: 'DuckDuckGo',
			publishedDate: new Date().toISOString().split('T')[0],
			snippet: topic.Text,
		})) || [];

		return { success: true, results };
	} catch (error) {
		console.error('Search error:', error);
		return { success: false, results: [] };
	}
}


const redis = new Redis(process.env.REDIS_URL!, {
	maxRetriesPerRequest: 50,  
	tls: {
		rejectUnauthorized: false,
	},
});

const simulateEventSchema = z.object({
	watchlistId: z.string().min(1, { message: 'ID de watchlist requerido.' }),
	description: z.string().min(1, { message: 'Descripción del evento requerida.' }),
});

export async function simulateEvent(formData: FormData) {
	const correlationId = uuidv4();  // Correlation ID para trazabilidad
	console.info(JSON.stringify({ message: 'Simulate event started', correlationId }));

	const data = {
		watchlistId: formData.get('watchlistId'),
		description: formData.get('description'),
	};

	const validation = simulateEventSchema.safeParse(data);
	if (!validation.success) {
		console.error(JSON.stringify({ message: 'Validation error', correlationId, errors: validation.error.flatten().fieldErrors }));
		return {
			success: false,
			errors: validation.error.flatten().fieldErrors,
		};
	}

	try {
		const watchlist = await db.watchlist.findUnique({
			where: { id: validation.data.watchlistId },
			select: { terms: true },
		});
		if (!watchlist) {
			console.error(JSON.stringify({ message: 'Watchlist not found', correlationId }));
			return { success: false, errors: { _global: ['Watchlist no encontrada.'] } };
		}

		const cacheKey = `event:${validation.data.description}:${validation.data.watchlistId}`;
		let aiResult = await redis.get(cacheKey);
		if (!aiResult) {
			console.info(JSON.stringify({ message: 'Cache miss, calling AI', correlationId }));
			aiResult = JSON.stringify(await processEventWithAI(validation.data.description, watchlist.terms, correlationId));
			await redis.set(cacheKey, aiResult, 'EX', 3600);  // Cache por 1 hora
		} else {
			console.info(JSON.stringify({ message: 'Cache hit', correlationId }));
		}

		const parsedAI = JSON.parse(aiResult);

		const newEvent = await db.event.create({
			data: {
				description: validation.data.description,
				summary: parsedAI.summary,
				severity: parsedAI.severity,
				suggestedAction: parsedAI.suggestedAction,
				watchlistId: validation.data.watchlistId,
			},
		});

		revalidatePath('/watchlists');
		console.info(JSON.stringify({ message: 'Event simulated successfully', correlationId }));
		return { success: true, event: newEvent };
	} catch (error) {
		console.error(JSON.stringify({ message: 'Database/AI error', correlationId, error: (error as Error).message }));
		return { success: false, errors: { _global: ['Error al simular el evento.'] } };
	}
}

(async () => {
	try {
		await redis.ping();  
		console.log('Redis connected successfully');
	} catch (err) {
		console.error('Redis connection error:', err);
	}
})();