## Decisiones Técnicas
- Arquitectura: Todo en Next.js con Server Actions para simplicidad y escalabilidad en Vercel (en lugar de backend separado).
- IA: Google Gemini para integración gratuita; fallback a mock por límites de cuota.
- Cache: Redis para resultados de IA recientes.
- Logs: JSON estructurados con correlationId para trazabilidad.
- DevOps: GitHub Actions para CI/CD; Vercel para deploy.