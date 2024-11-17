'use client';

import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider as NextThemesProvider } from 'next-themes'; // Import du ThemeProvider

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
    return (
        <html lang="fr">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Wrap the children with the ThemeProvider */}
        <NextThemesProvider attribute="class">
            {children}
        </NextThemesProvider>
        </body>
        </html>
    );
}
