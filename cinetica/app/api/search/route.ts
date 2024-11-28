// app/api/search/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from 'next/server';
import { search } from "@/app/Entities/search";

export async function GET(request: Request) {
   const session = await getServerSession(authOptions);
   if (!session?.user?.apiKey) {
       return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
   }

   const { searchParams } = new URL(request.url);
   const query = searchParams.get('q');

   if (!query) {
       return NextResponse.json({ results: [] });
   }

   try {
       const response = await fetch(
           `https://api.themoviedb.org/3/search/multi?api_key=${session.user.apiKey}&language=fr-FR&query=${encodeURIComponent(query)}&page=1&include_adult=false`
       );

       const data = await response.json();
       const results = data.results.filter(
           (item: search) => item.media_type === 'movie' || item.media_type === 'tv'
       );
       return NextResponse.json({ results });
   } catch {
       return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
   }
}