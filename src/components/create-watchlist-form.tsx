"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createWatchlist } from "@/lib/actions/actions";

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" aria-disabled={pending}>
			{pending ? "Creando..." : "Crear Lista"}
		</Button>
	);
}

export default function CreateWatchlistForm() {
	const [errors, setErrors] = useState<{ name?: string[], terms?: string[] } | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const handleAction = async (formData: FormData) => {
		const result = await createWatchlist(formData);
		if (result.success) {
			setTimeout(() => {
				setMessage("Watchlist creada con éxito!");
				setErrors(null);
			}, 1000);
		} else {
			if (result.errors && ('name' in result.errors || 'terms' in result.errors)) {
				setErrors({
					name: (result.errors as { name?: string[] }).name,
					terms: (result.errors as { terms?: string[] }).terms,
				});
			} else {
				setErrors(null);
			}
			setMessage("Error: " + JSON.stringify(result.errors));
		}
	};

	return (
		<Card className="w-full max-w-[450px] mx-auto shadow-lg">
			<CardHeader>
				<CardTitle>Crear Lista de Observación</CardTitle>
				<CardDescription>Crea una nueva lista con términos clave.</CardDescription>
			</CardHeader>
			<form action={handleAction}>
				<CardContent className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="name">Nombre de la lista</Label>
						<Input
							id="name"
							name="name"
							placeholder="Ej. 'Dominio sospechoso'"
							required
						/>
						{errors?.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="terms">Términos (separados por comas)</Label>
						<Input
							id="terms"
							name="terms"
							placeholder="Ej. 'google, apple, microsoft'"
							required
						/>
						{errors?.terms && <p className="text-sm text-red-500">{errors.terms[0]}</p>}
					</div>
				</CardContent>
				<CardFooter className="flex justify-start pt-2">
					<SubmitButton />
				</CardFooter>
				{message && <p className={`mt-4 text-center ${errors ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
			</form>
		</Card>
	);
}
