## Historial de Prompts de IA
Prompt Principal (en aiService.ts):
Eres un analista de IA para vigilancia de señales.
Evento: "${description}"
Términos de vigilancia: ${terms.join(', ')}

Tareas:
1. Resume el evento en lenguaje natural español (1-2 oraciones).
2. Clasifica la severidad: LOW (menor), MED (notable), HIGH (urgente), CRITICAL (acción inmediata).
3. Sugiere la siguiente acción para el analista (ej. "Investigar manualmente" o "Ignorar").

Responde en JSON: { "summary": "...", "severity": "...", "suggestedAction": "..." }

Uso: Llamado en simulateEvent. Modo mock activado para pruebas sin cuota.
Historia: Probado con descripciones como "Dominio sospechoso detectado" (severidad HIGH).