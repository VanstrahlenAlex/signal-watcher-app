"use client"
import type { Watchlist } from "@/lib/interfaces/watchlist.interface"
import { useState } from "react"
import { Button } from "./ui/button"
import { Pencil } from "lucide-react"
import { EditWatchlistModal } from "./edit-watchlist-modal"

export function EditButton({ watchlist }: { watchlist: Watchlist }) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<>
			<Button
				className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors duration-200"
				onClick={() => setIsModalOpen(true)}
			>
				<Pencil size={16} />
			</Button>

			<EditWatchlistModal watchlist={watchlist} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	)
}