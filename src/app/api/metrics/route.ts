import { Registry, collectDefaultMetrics, Histogram } from 'prom-client';
import { NextResponse } from 'next/server';

const register = new Registry();
collectDefaultMetrics({ register });

export async function GET() {
	return new NextResponse(await register.metrics(), { headers: { 'Content-Type': register.contentType } });
}