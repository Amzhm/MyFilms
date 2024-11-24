import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.apiKey) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${session.user.apiKey}&language=fr-FR&page=1`
        );

        if (!response.ok) {
            return NextResponse.json({ error: 'Erreur TMDB' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}