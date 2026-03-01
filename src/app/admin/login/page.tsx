// app/admin/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function AdminLogin() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        })

        if (res.ok) {
            router.push('/admin')
        } else {
            setError('Mot de passe incorrect')
        }
    }

    return (
        <div className="admin-login">
            <h1>🔐 Espace Admin</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                />
                <button type="submit">Accéder</button>
                {error && <p className="error">{error}</p>}
            </form>
            <Link href="/" className={'logout-btn'}>Retour</Link>

        </div>
    )
}
