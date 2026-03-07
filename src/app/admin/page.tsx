'use client'
import './admin.css';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
    const [rsvps, setRsvps] = useState([])
    const [selectedComment, setSelectedComment] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        fetch('/api/rsvp')
            .then(res => res.json())
            .then(data => {
                setRsvps(data.data)
            })
    }, [])

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' })
        router.push('/admin/login')
    }

    const openModal = (comment: string) => {
        setSelectedComment(comment)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedComment(null)
    }

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <h1>Liste des RSVP ({rsvps.length})</h1>
                <button onClick={handleLogout}>Déconnexion</button>
            </div>

            {/* Ajoutez le conteneur de scroll */}
            <div className="table-scroll-container">
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
                            <td
                                className="comment-cell"
                                onClick={() => rsvp.comment && openModal(rsvp.comment)}
                            >
                                {rsvp.comment ? (
                                    <>
                                        <span className="comment-preview">
                                            {rsvp.comment.length > 30
                                                ? `${rsvp.comment.substring(0, 30)}...`
                                                : rsvp.comment}
                                        </span>
                                        {rsvp.comment.length > 30 && (
                                            <span className="view-more">(cliquer pour voir plus)</span>
                                        )}
                                    </>
                                ) : '—'}
                            </td>
                            <td>{new Date(rsvp.createdAt).toLocaleDateString('fr-FR')}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal pour afficher le commentaire complet */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal}>×</button>
                        <h2>Commentaire complet</h2>
                        <div className="comment-text">
                            {selectedComment}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}
