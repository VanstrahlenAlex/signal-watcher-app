"use client";
import { deleteWatchlist } from "@/lib/actions/actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

export function DeleteButton({ id }: { id: string }) {
	const { pending } = useFormStatus();
	const [isDeleting, setIsDeleting] = useState(false);

	// Utilizamos un FormData para pasar el ID a la Server Action
	const formData = new FormData();
	formData.append('id', id);

	const handleDelete = async () => {
		setIsDeleting(true);
		// Llama a la Server Action
		await deleteWatchlist(formData);
		setIsDeleting(false);
	}

	return (
		<Button
			className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-200"
			onClick={handleDelete}
			disabled={pending || isDeleting}
		>
			{isDeleting ? "Eliminando..." : <Trash size={16} />}
		</Button>
	);
}