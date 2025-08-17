/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
 // Importa la nueva acción
import { useFormState } from 'react-dom';  // Nota: No uses useFormStatus aquí, solo useFormState
import { simulateEvent } from '@/lib/actions/actions';

export default function SimulateButton({ watchlistId }: { watchlistId: string }) {
	const [open, setOpen] = useState(false);
	const [state, formAction] = useActionState(
		(_state: any, formData: FormData) => simulateEvent(formData),
		{ success: false, errors: {} }
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Simular Evento</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Simular Evento</DialogTitle>
				</DialogHeader>
				<form action={(formData) => { formAction(formData); setOpen(false); }} className="space-y-4">
					<input type="hidden" name="watchlistId" value={watchlistId} />
					<div>
						<Label htmlFor="description" className='pb-2'>Descripción del Evento</Label>
						<Input id="description" name="description" placeholder="Ej. Nuevo dominio sospechoso detectado" />
						{state.errors && 'description' in state.errors && Array.isArray(state.errors.description) && (
							<p className="text-red-500 text-sm">{state.errors.description[0]}</p>
						)}
					</div>
					<Button type="submit">Simular</Button>
					{'_global' in (state.errors ?? {}) && Array.isArray((state.errors as any)._global) && (
						<p className="text-red-500">{(state.errors as any)._global[0]}</p>
					)}
				</form>
			</DialogContent>
		</Dialog>
	);
}