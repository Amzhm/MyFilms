// app/api/shows/[id]/route.ts

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
        const showResponse = await fetch(
            `https://api.themoviedb.org/3/tv/${params.id}?api_key=${session.user.apiKey}&language=en-US&append_to_response=credits,images,videos&include_image_language=en,null`
        );
        
        if (!showResponse.ok) {
            throw new Error('TMDB API error');
        }

        const showData = await showResponse.json();
        
        return NextResponse.json({
            ...showData,
            credits: showData.credits,
            videos: showData.videos.results,
            images: {
                backdrops: showData.images.backdrops,
                posters: showData.images.posters,
            }
        });
    } catch (error) {
        console.error('Error fetching show details:', error);
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}