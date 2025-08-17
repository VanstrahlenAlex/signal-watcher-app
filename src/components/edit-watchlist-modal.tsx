"use client"
import { editWatchlist } from "@/lib/actions/actions"
import type { Watchlist } from "@/lib/interfaces/watchlist.interface"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface EditWatchlistModalProps {
	watchlist: Watchlist
	isOpen: boolean
	onClose: () => void
}

function SubmitButton() {
	const { pending } = useFormStatus()
	return (
		<Button type="submit" disabled={pending}>
			{pending ? "Guardando..." : "Guardar cambios"}
		</Button>
	)
}

export function EditWatchlistModal({ watchlist, isOpen, onClose }: EditWatchlistModalProps) {
	const [name, setName] = useState(watchlist.name)
	const [terms, setTerms] = useState(watchlist.terms.join(", "))
	const [message, setMessage] = useState<string | null>(null)

	const handleEdit = async (formData: FormData) => {
		const result = await editWatchlist(formData)
		if (result.success) {
			setMessage("¡Watchlist actualizada con éxito!")
			setTimeout(() => {
				setMessage(null)
				onClose()
			}, 1500)
		} else {
			setMessage("Error al actualizar la watchlist.")
		}
	}

	const handleClose = () => {
		setMessage(null)
		setName(watchlist.name)
		setTerms(watchlist.terms.join(", "))
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Editar Watchlist</DialogTitle>
					<DialogDescription>Modifica el nombre y los términos de tu lista de observación.</DialogDescription>
				</DialogHeader>

				<form action={handleEdit} className="space-y-4">
					<input type="hidden" name="id" value={watchlist.id} />

					<div className="space-y-2">
						<Label htmlFor="name">Nombre de la lista</Label>
						<Input
							id="name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Ingresa el nombre de la lista"
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="terms">Términos (separados por comas)</Label>
						<Input
							id="terms"
							name="terms"
							value={terms}
							onChange={(e) => setTerms(e.target.value)}
							placeholder="término1, término2, término3"
							required
						/>
					</div>

					{message && (
						<div
							className={`text-sm text-center p-2 rounded ${message.includes("éxito")
									? "text-green-700 bg-green-50 border border-green-200"
									: "text-red-700 bg-red-50 border border-red-200"
								}`}
						>
							{message}
						</div>
					)}

					<DialogFooter>
						<Button type="button" variant="outline" onClick={handleClose}>
							Cancelar
						</Button>
						<SubmitButton />
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
