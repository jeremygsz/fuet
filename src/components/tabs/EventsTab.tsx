'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, ExternalLink } from 'lucide-react';

const events = [
    {
        id: 1,
        emoji: '⚖️',
        title: 'Mairie',
        time: '10h00',
        location: 'Mairie du 9ème arrondissement',
        address: '6 Rue Drouot, 75009 Paris',
        mapsUrl: 'https://maps.app.goo.gl/AS2Bs6txqFwFG4dr7',
    },
    {
        id: 2,
        emoji: '🥂',
        title: 'After Mairie',
        time: '12h00',
        location: 'Chez les Grosz',
        address: '65 rue de Maubeuge, 75009 Paris',
        mapsUrl: 'https://maps.app.goo.gl/s7v6oJ7bbjwzpwii7',
    },
    {
        id: 3,
        emoji: '💍',
        title: 'Houppa & Soirée',
        time: '18h00',
        location: 'Domaine de la Revardiere',
        address: '1 Chemin de la Revardiere, 61400 Feings',
        mapsUrl: 'https://maps.app.goo.gl/xez8i8cTxk2katRW9',
    },
    {
        id: 4,
        emoji: '☀️',
        title: 'Petit Déjeuner',
        time: '10h30 (lendemain)',
        location: 'Domaine de la Revardiere',
        address: '1 Chemin de la Revardiere, 61400 Feings',
        mapsUrl: 'https://maps.app.goo.gl/xez8i8cTxk2katRW9',
    },
];

export default function EventsTab() {
    return (
        <section className="events-section">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Programme de la journée
            </motion.h2>

            <div className="timeline-container">
                <div className="timeline-line" />
                <div className="timeline-events">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            className="event-card"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                        >
                            <div className="event-marker">
                                <div className="marker-dot" />
                            </div>
                            <div className="event-content">
                                <div className="event-time-badge">
                                    <Clock size={16} />
                                    {event.time}
                                </div>
                                <h3 className="event-title">
                                    {event.emoji} {event.title}
                                </h3>
                                <div className="event-location">
                                    <MapPin size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                                    <span>{event.location}</span>
                                </div>
                                <p className="event-address">{event.address}</p>
                                <a
                                    href={event.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="maps-link"
                                >
                                    <ExternalLink size={16} />
                                    Voir sur Maps
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
