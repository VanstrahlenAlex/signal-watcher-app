## Monitoreo
- Logs: Revisa console en Vercel o local para correlationId.
- Métricas: Accede a /api/metrics para Prometheus basics.

## Soporte
- Error en IA: Verifica GEMINI_API_KEY y cuotas; fallback a mock si falla.
- DB/Redis: Verifica conexiones en env vars; reinicia si errores.
- Escala: Vercel auto-escala; monitorea quotas de Neon/Upstash.