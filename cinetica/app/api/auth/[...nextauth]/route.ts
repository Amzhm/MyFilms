// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

// Exportez uniquement le handler sous forme d'objet
export { handler as GET, handler as POST };