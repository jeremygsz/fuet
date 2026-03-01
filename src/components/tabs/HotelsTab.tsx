// components/tabs/HotelsTab.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Users, Phone, Globe, Mail, Instagram, ChevronDown } from 'lucide-react';
import { hotelsData } from '@/data/hotels';

type Hotel = {
    name: string;
    type?: string;
    location?: string;
    distance: string;
    capacity: string;
    address?: string;
    link?: string;
    phone?: string;
    email?: string;
    instagram?: string;
    description?: string;
    mapsUrl?: string;
};

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
};


export default function HotelsTab() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    return (
        <div className="tab-content">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="section-title">Hébergements à proximité</h2>
                <p className="section-subtitle">
                    Quelques adresses soigneusement sélectionnées près du lieu de réception
                </p>
            </motion.div>

            <motion.div
                className="hotels-grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {hotelsData.map((hotel: Hotel, index: number) => {
                    const isOpen = expandedIndex === index;
                    const hasDetails = hotel.phone || hotel.email || hotel.instagram || hotel.link || hotel.mapsUrl || hotel.address;

                    return (
                        <motion.div
                            key={hotel.name}
                            className={`hotel-card-v2 ${isOpen ? 'hotel-card-v2--open' : ''}`}
                            initial={{ opacity: 0, y: 30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.08,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        >

                            {/* Header cliquable */}
                            <button
                                className="hotel-card-header"
                                onClick={() => hasDetails && toggle(index)}
                                style={{ cursor: hasDetails ? 'pointer' : 'default' }}
                            >
                                <div className="hotel-card-title-block">
                                    <h3 className="hotel-card-name">{hotel.name}</h3>
                                    {hotel.type && (
                                        <span className="hotel-card-badge">{hotel.type}</span>
                                    )}
                                    {hotel.description && (
                                        <span className="hotel-card-badge hotel-card-badge--special">
                                            ✨ {hotel.description}
                                        </span>
                                    )}
                                </div>
                                {hasDetails && (
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="hotel-chevron"
                                    >
                                        <ChevronDown size={18} />
                                    </motion.div>
                                )}
                            </button>

                            {/* Infos de base toujours visibles */}
                            <div className="hotel-card-infos">
                                {hotel.location && (
                                    <div className="hotel-pill">
                                        <MapPin size={13} />
                                        <span>{hotel.location}</span>
                                    </div>
                                )}
                                <div className="hotel-pill hotel-pill--accent">
                                    <Clock size={13} />
                                    <span>{hotel.distance}</span>
                                </div>
                                <div className="hotel-pill">
                                    <Users size={13} />
                                    <span>{hotel.capacity}</span>
                                </div>
                            </div>

                            {/* Détails dépliables */}
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        key="details"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div className="hotel-card-details">
                                            {hotel.address && (
                                                <div className="hotel-detail-row">
                                                    <MapPin size={14} />
                                                    <span>{hotel.address}</span>
                                                </div>
                                            )}
                                            {hotel.phone && (
                                                <div className="hotel-detail-row">
                                                    <Phone size={14} />
                                                    <a href={`tel:${hotel.phone}`} className="hotel-detail-link">
                                                        {hotel.phone}
                                                    </a>
                                                </div>
                                            )}
                                            {hotel.email && (
                                                <div className="hotel-detail-row">
                                                    <Mail size={14} />
                                                    <a href={`mailto:${hotel.email}`} className="hotel-detail-link">
                                                        {hotel.email}
                                                    </a>
                                                </div>
                                            )}
                                            {hotel.instagram && (
                                                <div className="hotel-detail-row">
                                                    <Instagram size={14} />
                                                    <a
                                                        href={`https://instagram.com/${hotel.instagram}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hotel-detail-link"
                                                    >
                                                        @{hotel.instagram}
                                                    </a>
                                                </div>
                                            )}

                                            <div className="hotel-card-actions">
                                                {hotel.link && (
                                                    <a
                                                        href={hotel.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hotel-action-btn hotel-action-btn--primary"
                                                    >
                                                        <Globe size={14} />
                                                        Site web
                                                    </a>
                                                )}
                                                {hotel.mapsUrl && (
                                                    <a
                                                        href={hotel.mapsUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hotel-action-btn hotel-action-btn--secondary"
                                                    >
                                                        <MapPin size={14} />
                                                        Itinéraire
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
