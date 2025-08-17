import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
	Database,
	Zap,
	Brain,
	Shield,
	Code,
	Server,
	Monitor,
	GitBranch,
	ExternalLink,
	User,
	Mail,
	Github,
	Linkedin
} from "lucide-react"

export default function PresentationPage() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
			{/* Header Section */}
			<header className="bg-primary text-primary-foreground py-16">
				<div className="container mx-auto px-6 text-center">
					<div className="flex items-center justify-center gap-4 mb-6">
						<User className="h-12 w-12" />
						<div>
							<h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight">Alexander Van Strahlen</h1>
							<p className="text-xl md:text-2xl font-light mt-2 opacity-90">Full Stack Developer</p>
						</div>
					</div>
					<div className="flex items-center justify-center gap-6 mt-8">
						<div className="flex items-center gap-2">
							<Mail className="h-5 w-5" />
							<span>vanstrahlenalex@gmail.com</span>
						</div>
						<div className="flex items-center gap-2">
							<Github className="h-5 w-5" />
							<span>VanstrahlenAlex</span>
						</div>
					</div>
				</div>
			</header>

			{/* Project Overview */}
			<section className="py-16">
				<div className="container mx-auto px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-serif font-bold text-accent mb-4">Signal Watcher App</h2>
						<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
							Micro-producto para vigilancia de señales con Next.js, Prisma, Redis y IA (Gemini/mock). Una solución
							completa para monitoreo inteligente de eventos y análisis predictivo.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8 mb-12">
						<Card className="shadow-lg hover:shadow-xl transition-shadow">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-accent">
									<Zap className="h-6 w-6" />
									Funcionalidades Principales
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-accent rounded-full"></div>
									<span>Creación y gestión de watchlists personalizadas</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-accent rounded-full"></div>
									<span>Simulación de eventos con procesamiento IA</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-accent rounded-full"></div>
									<span>Búsqueda inteligente de señales</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-accent rounded-full"></div>
									<span>Interfaz modal para edición avanzada</span>
								</div>
							</CardContent>
						</Card>

						<Card className="shadow-lg hover:shadow-xl transition-shadow">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-accent">
									<Code className="h-6 w-6" />
									Stack Tecnológico
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									<Badge variant="secondary">Next.js 15</Badge>
									<Badge variant="secondary">TypeScript</Badge>
									<Badge variant="secondary">Prisma ORM</Badge>
									<Badge variant="secondary">PostgreSQL</Badge>
									<Badge variant="secondary">Redis</Badge>
									<Badge variant="secondary">Google Gemini AI</Badge>
									<Badge variant="secondary">Tailwind CSS</Badge>
									<Badge variant="secondary">SHADCN/UI</Badge>
									<Badge variant="secondary">Neon</Badge>
									<Badge variant="secondary">Vercel</Badge>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="text-center">
						<Link href="/watchlists">
							<Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
								Ver Aplicación en Vivo
								<ExternalLink className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Technical Architecture */}
			<section className="py-16 bg-muted/50">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-serif font-bold text-center mb-12 text-accent">Arquitectura Técnica</h2>

					<div className="grid md:grid-cols-3 gap-8 mb-12">
						<Card className="shadow-lg">
							<CardHeader className="text-center">
								<Server className="h-12 w-12 mx-auto text-accent mb-4" />
								<CardTitle>Backend Architecture</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2 text-sm">
									<li>• Next.js App Router con Server Actions</li>
									<li>• Prisma ORM para gestión de datos</li>
									<li>• PostgreSQL (Neon) como base de datos</li>
									<li>• Redis (Upstash) para caché</li>
								</ul>
							</CardContent>
						</Card>

						<Card className="shadow-lg">
							<CardHeader className="text-center">
								<Brain className="h-12 w-12 mx-auto text-accent mb-4" />
								<CardTitle>AI Integration</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2 text-sm">
									<li>• Google Gemini para análisis inteligente</li>
									<li>• Sistema de fallback con mock data</li>
									<li>• Procesamiento de eventos en tiempo real</li>
									<li>• Análisis predictivo de señales</li>
								</ul>
							</CardContent>
						</Card>

						<Card className="shadow-lg">
							<CardHeader className="text-center">
								<Monitor className="h-12 w-12 mx-auto text-accent mb-4" />
								<CardTitle>DevOps & Monitoring</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2 text-sm">
									<li>• GitHub Actions para CI/CD</li>
									<li>• Vercel para deployment automático</li>
									<li>• Logs estructurados con correlationId</li>
									<li>• Métricas Prometheus en /api/metrics</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Design Decisions */}
			<section className="py-16">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-serif font-bold text-center mb-12 text-accent">Decisiones de Diseño</h2>

					<div className="grid md:grid-cols-2 gap-8">
						<Card className="shadow-lg">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Shield className="h-6 w-6 text-accent" />
									Arquitectura Monolítica Inteligente
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Opté por una arquitectura todo-en-Next.js con Server Actions para maximizar la simplicidad y
									escalabilidad en Vercel, evitando la complejidad de un backend separado mientras mantengo la
									flexibilidad para futuras expansiones.
								</p>
							</CardContent>
						</Card>

						<Card className="shadow-lg">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Database className="h-6 w-6 text-accent" />
									Estrategia de Datos Híbrida
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Implementé una combinación de PostgreSQL para persistencia y Redis para caché de resultados de IA,
									optimizando tanto la consistencia de datos como el rendimiento de consultas frecuentes.
								</p>
							</CardContent>
						</Card>

						<Card className="shadow-lg">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Brain className="h-6 w-6 text-accent" />
									IA con Fallback Robusto
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Integré Google Gemini con un sistema de fallback a mock data para garantizar disponibilidad continua
									del servicio, incluso cuando se alcanzan los límites de cuota de la API externa.
								</p>
							</CardContent>
						</Card>

						<Card className="shadow-lg">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<GitBranch className="h-6 w-6 text-accent" />
									Observabilidad Avanzada
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Implementé logs JSON estructurados con correlationId para trazabilidad completa y métricas Prometheus
									para monitoreo proactivo del rendimiento y salud del sistema.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-primary text-primary-foreground py-12">
				<div className="container mx-auto px-6 text-center">
					<h3 className="text-2xl font-serif font-bold mb-4">Prueba Técnica para Kiggu</h3>
					<p className="text-lg opacity-90 mb-6">Desarrollado con pasión por la excelencia técnica y la innovación</p>
					<div className="flex justify-center gap-4">
						<Link href="/watchlists">
							<Button variant="secondary" size="lg">
								Explorar Aplicación
							</Button>
						</Link>
					</div>
					<div className="mt-8 pt-8 border-t border-primary-foreground/20">
						<p className="text-sm opacity-75">© 2025 Alexander Van Strahlen - Todos los derechos reservados</p>
						<div className="flex justify-center gap-4 mt-4">
							<Link href="https://www.linkedin.com/in/vanstrahlenalex/" target="_blank">
								<Button variant="secondary"><Linkedin className="h-8 w-8 inline" /></Button>
							</Link>
							<Link href="https://github.com/VanstrahlenAlex" target="_blank">
								<Button variant="secondary"><Github className="h-8 w-8 inline" /></Button>
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</main>
	)
}
