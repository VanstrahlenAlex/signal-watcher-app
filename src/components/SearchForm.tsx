/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { searchSignals } from "@/lib/actions/actions";

// Define tipo para el estado
interface SearchState {
	success: boolean;
	results: any[];
	errors?: { _global?: string[] };  // Opcional para manejar errores
}

async function handleSearch(prevState: SearchState, formData: FormData): Promise<SearchState> {
	const result = await searchSignals(formData);
	return result;  // Asegúrate de que searchSignals retorne SearchState
}

export default function SearchForm() {
	const [state, formAction] = useActionState(handleSearch, { success: false, results: [] });

	return (
		<form action={formAction} className="space-y-4">
			<Input name="query" placeholder="Buscar señales (ej. dominio sospechoso)" />
			<Button type="submit">Buscar</Button>
			{state.success && state.results.length > 0 && (
				<div className="mt-4 space-y-2">
					{state.results.map((result: any) => (
						<Card key={result.id}>
							<CardContent>
								<p><strong>{result.title}</strong></p>
								<p className="text-sm">{result.snippet}</p>
								<a href={result.url} className="text-blue-500">Ver más</a>
							</CardContent>
						</Card>
					))}
				</div>
			)}
			{state.errors?._global && <p className="text-red-500">{state.errors._global[0]}</p>} 
		</form>
	);
}