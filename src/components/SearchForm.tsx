/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchResults from "./SearchResults"; 
import { searchSignals } from "@/lib/actions/actions";

interface SearchState {
	success: boolean;
	results: any[];
	errors?: { _global?: string[] };
}

async function handleSearch(prevState: SearchState, formData: FormData): Promise<SearchState> {
	const result = await searchSignals(formData);
	return result;
}

export default function SearchForm() {
	const [state, formAction] = useActionState(handleSearch, { success: false, results: [] });

	return (
		<form action={formAction} className="space-y-4">
			<Input name="query" placeholder="Buscar señales (ej. dominio sospechoso)" />
			<Button type="submit">Buscar</Button>
			{state.success && state.results.length > 0 && (
				<SearchResults results={state.results} /> 
			)}
			{state.errors?._global && <p className="text-red-500">{state.errors._global[0]}</p>}
		</form>
	);
}