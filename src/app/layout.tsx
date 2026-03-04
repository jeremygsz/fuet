import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
    title: 'Mariage Agathe & Calvin',
    description: 'Mariage Agathe & Calvin',

    // OBLIGATOIRE pour WhatsApp : l'URL complète de ton site en production
    metadataBase: new URL('https://fuet.vercel.app/'),

    openGraph: {
        title: 'Mariage Agathe & Calvin',
        description: 'Mariage Agathe & Calvin',
        url: 'https://ton-site.vercel.app',
        siteName: 'Toutes les infos dont vous avez besoin',
        locale: 'fr_FR',
        type: 'website',
    },
}
export default function RootLayout({children,}:{ children: React.ReactNode;})
{
    return (
        <html lang="fr">
        <body>{children}</body>
        </html>
    );
}
