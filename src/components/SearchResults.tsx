"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";


interface SearchResult {
	id: string;
	title: string;
	url: string;
	source: string;
	publishedDate: string; 
	snippet: string;
}

interface SearchResultsProps {
	results: SearchResult[];
}

export default function SearchResults({ results }: SearchResultsProps) {
	return (
		<div className="w-full max-w-4xl mx-auto space-y-6">

			{results.length === 0 ? (
				<p className="text-center text-gray-500 text-lg">
					No se encontraron resultados para los términos de búsqueda.
				</p>
			) : (

				<div className="grid gap-6">
					{results.map((result) => (
						<Card
							key={result.id}
							className="shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 rounded-xl"
						>
							<CardHeader>
								<CardTitle className="flex items-start text-xl text-blue-700 hover:underline">
									<a href={result.url} target="_blank" rel="noopener noreferrer" className="flex-1">
										{result.title}
									</a>
									<ExternalLink className="ml-2 text-gray-500" size={16} />
								</CardTitle>
								<CardDescription className="text-gray-500 text-sm mt-1">
									<span className="font-semibold">{result.source}</span>
									<span className="mx-2">•</span>
									<span>{result.publishedDate}</span>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-gray-700 text-base leading-relaxed">
									{result.snippet}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}

