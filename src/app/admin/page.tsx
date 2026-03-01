'use client'
import './admin.css';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
    const [rsvps, setRsvps] = useState([])
    const router = useRouter()

    useEffect(() => {
        fetch('/api/rsvp')
            .then(res => res.json())
            .then(data => {
                setRsvps(data.data)
                console.log(data.data)

            })
    }, [])

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' })
        router.push('/admin/login')
    }

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <h1>Liste des RSVP ({rsvps.length})</h1>
                <button onClick={handleLogout}>Déconnexion</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Mairie</th>
                    <th>After Mairie</th>
                    <th>Houppa & soirée</th>
                    <th>Brunch</th>
                    <th>Commentaire</th>
                    <th>Date de création</th>
                </tr>
                </thead>
                <tbody>
                {rsvps.map((rsvp: any) => (
                    <tr key={rsvp.id}>
                        <td>{rsvp.firstName}</td>
                        <td>{rsvp.lastName}</td>
                        <td>{rsvp.mairie}</td>
                        <td>{rsvp.afterMairie}</td>
                        <td>{rsvp.houppa}</td>
                        <td>{rsvp.petitDejeuner}</td>
                        <td>{rsvp.comment || '—'}</td>
                        <td>{new Date(rsvp.createdAt).toLocaleDateString('fr-FR')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
