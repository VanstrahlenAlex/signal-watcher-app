"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"

export default function Home() {
	const router = useRouter();

	const handleNavigation = () => {
		router.push("/watchlists");
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<Button onClick={handleNavigation}>
				Go to Watchlists Page
			</Button>
		</div>
	);
}
