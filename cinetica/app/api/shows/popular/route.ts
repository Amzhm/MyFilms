import { NextResponse } from 'next/server';

export async function GET() {
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    if (!TMDB_API_KEY) {
        return NextResponse.json({ error: 'TMDB API key is missing' }, { status: 500 });
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch data from TMDB' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}