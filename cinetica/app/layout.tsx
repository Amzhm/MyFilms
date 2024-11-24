// app/layout.tsx
'use client';

import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

// Police Geist Sans
const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});

// Police Geist Mono
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

// Types pour les props du layout
interface LayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="fr">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SessionProvider>
                    <ThemeProvider attribute="class">
                        {children}
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}