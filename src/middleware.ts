import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('admin-token')?.value
console.log(process.env.ADMIN_SECRET)
    // 1. AUTORISER la page de login (sinon : boucle infinie)
    // On vérifie si l'URL actuelle est la page de login
    if (pathname === '/admin/login') {
        // Si l'utilisateur est DÉJÀ connecté et essaie d'aller sur login,
        // on peut le rediriger vers le dashboard
        if (token === process.env.ADMIN_SECRET) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
        return NextResponse.next()
    }

    // 2. PROTÉGER les autres routes admin
    if (!token || token !== process.env.ADMIN_SECRET) {
        // Ajout d'un log pour débugger dans ta console terminal (pas navigateur)
        console.log("Accès refusé, redirection vers login...");
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return NextResponse.next()
}

// 3. Configuration du Matcher
export const config = {
    // On cible explicitement /admin ET tout ce qui est après
    matcher: ['/admin', '/admin/:path*'],
}
