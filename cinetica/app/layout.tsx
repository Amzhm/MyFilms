'use client';

import { useState, useEffect } from 'react';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    const [isDark, setIsDark] = useState(false);

    // Vérifie les préférences du système au moment du premier rendu
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(prefersDark); // Applique le mode sombre ou clair selon la préférence de l'utilisateur

        // Écoute les changements de préférence de couleur
        const mediaQueryListener = (e: MediaQueryListEvent) => {
            setIsDark(e.matches);
        };

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', mediaQueryListener);

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', mediaQueryListener);
        };
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}
