import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';

const gemini = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
const isMock = !process.env.GEMINI_API_KEY;

export async function processEventWithAI(description: string, terms: string[], correlationId: string): Promise<{ summary: string; severity: string; suggestedAction: string }> {
	console.info(JSON.stringify({ message: 'Processing AI', correlationId, description }));

	const prompt = `
  Eres un analista de IA para vigilancia de señales.
  Evento: "${description}"
  Términos de vigilancia: ${terms.join(', ')}

  Tareas:
  1. Resume el evento en lenguaje natural español (1-2 oraciones).
  2. Clasifica la severidad: LOW (menor), MED (notable), HIGH (urgente), CRITICAL (acción inmediata).
  3. Sugiere la siguiente acción para el analista (ej. "Investigar manualmente" o "Ignorar").

  Responde en JSON: { "summary": "...", "severity": "...", "suggestedAction": "..." }
  `;

	if (isMock) {
		console.info(JSON.stringify({ message: 'Using mock AI', correlationId }));
		return mockAIResponse(description);
	}

	if (!gemini) {
		throw new Error('Gemini API key is missing or invalid');
	}

	try {
		const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' });
		const response = await model.generateContent(prompt);
		// Asegúrate de que el texto devuelto sea un JSON válido eliminando markdown
		let text = response.response.text();
		// Elimina ```json y ``` al inicio y final si los incluye
		text = text.replace(/```json\s*|\s*```/g, '').trim();
		const result = JSON.parse(text);
		console.info(JSON.stringify({ message: 'AI processed successfully', correlationId }));
		return result;
	} catch (error) {
		const errorMsg = (error as Error).message;
		console.error(JSON.stringify({ message: 'AI error', correlationId, error: errorMsg }));
		if (errorMsg.includes('quota') || errorMsg.includes('402') || errorMsg.includes('429')) {
			console.warn(JSON.stringify({ message: 'Quota or balance issue, falling back to mock', correlationId }));
			return mockAIResponse(description);
		}
		throw error;
	}
}

function mockAIResponse(description: string): { summary: string; severity: string; suggestedAction: string } {
	const severity = description.includes('sospechoso') ? 'HIGH' : 'LOW';
	return {
		summary: `Resumen mock: ${description}`,
		severity,
		suggestedAction: 'Acción mock: Revisar.',
	};
}