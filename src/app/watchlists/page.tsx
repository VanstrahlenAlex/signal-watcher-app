/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CreateWatchlistForm from "@/components/create-watchlist-form"; 
import { DeleteButton } from "@/components/deleteButton";
import { EditButton } from "@/components/editingButton";
import SimulateButton from "@/components/SimulateButton";
import SearchForm from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function WatchlistsPage() {
	
	const watchlists = await db.watchlist.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		include: { events: true },
	});

	return (
		<main className="flex min-h-screen p-8 bg-gray-100 flex-col items-center">
			<div className="border-2 border-gray-300 rounded-lg p-6 bg-white w-full max-w-6xl">
				<Link href="/">
					<Button>Presentación</Button>
				</Link>
				<div className="w-full max-w-lg mb-8 mx-auto">
					<CreateWatchlistForm />
				</div>

				<section className="w-full max-w-4xl">
					<h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Tus Listas de Observación</h2>
					{watchlists.length === 0 ? (
						<p className="text-center text-gray-500">Aún no tienes listas de observación. ¡Crea una para empezar!</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{watchlists.map((watchlist: any) => (
								<Card key={watchlist.id} className="shadow-md hover:shadow-xl transition-shadow duration-300">
									<div className="flex justify-end items-center p-4 space-x-2">
										<DeleteButton id={watchlist.id} />
										<EditButton watchlist={watchlist} />
									</div>
									<CardHeader>
										<CardTitle className="text-xl">{watchlist.name}</CardTitle>
									</CardHeader>
									<CardContent>
										<CardDescription className="text-gray-600 mb-2">Términos:</CardDescription>
										<ul className="list-disc list-inside space-y-1">
											{watchlist.terms.map((term: any, index: number) => (
												<li key={index} className="text-sm text-gray-700">{term}</li>
											))}
										</ul>
									</CardContent>
									<div className="m-4">
										<CardDescription className="text-gray-600 mb-2 mt-2">Eventos:</CardDescription>
										{watchlist.events.length === 0 ? (
											<p className="text-sm text-gray-500">No hay eventos simulados aún.</p>
										) : (
											<ul className="space-y-2">
												{watchlist.events.map((event: any) => (
													<li key={event.id} className="text-sm border-t pt-2">
														<p><strong>Descripción:</strong> {event.description}</p>
														<p><strong>Resumen:</strong> {event.summary}</p>
														<p><strong>Severidad:</strong> {event.severity}</p>
														<p><strong>Sugerencia:</strong> {event.suggestedAction}</p>
													</li>
												))}
											</ul>
										)}
										<div className="mt-4">
											<SimulateButton watchlistId={watchlist.id} />
										</div>
									</div>
								</Card>
							))}
						</div>
					)}
				</section>
				<div className="w-full max-w-lg mt-8">
					<h2 className="text-xl font-bold mb-2">Buscar Señales</h2>
					<SearchForm />
				</div>
			</div>
		</main>
	);
}

