// app/api/movies/[id]/route.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.apiKey) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const movieResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${params.id}?api_key=${session.user.apiKey}&language=en-US&append_to_response=credits,images,videos&include_image_language=en,null`
        );
        
        if (!movieResponse.ok) {
            throw new Error('TMDB API error');
        }

        const movieData = await movieResponse.json();
        
        return NextResponse.json({
            ...movieData,
            credits: movieData.credits,
            videos: movieData.videos.results,
            images: {
                backdrops: movieData.images.backdrops,
                posters: movieData.images.posters,
            }
        });
    } catch (error) {
        console.log('Error fetching movie details:', error);
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}