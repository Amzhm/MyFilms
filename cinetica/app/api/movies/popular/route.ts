// app/api/movies/popular/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';

    if (!session?.user?.apiKey) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${session.user.apiKey}&language=fr-FR&page=${page}`
        );
        
        if (!response.ok) {
            throw new Error('TMDB API error');
        }

        const data = await response.json();
        return NextResponse.json({
            results: data.results,
            page: data.page,
            total_pages: data.total_pages,
            total_results: data.total_results
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}