'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// ─── Countdown ──────────────────────────────────────────────────────────────
const WEDDING_DATE = new Date('2026-08-03T16:00:00');
function getTimeLeft() {
    const diff = WEDDING_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
    return (
        <div style={{ textAlign: 'center', minWidth: '64px' }}>
            <div style={{
                background: 'rgba(201,169,110,0.08)',
                border: '1px solid rgba(201,169,110,0.3)',
                borderRadius: '8px',
                padding: '10px 12px',
                marginBottom: '6px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
            }}>
                <motion.span
                    key={value}
                    initial={{ y: -24, opacity: 0 }}
                    animate={{ y: 0,   opacity: 1 }}
                    exit={{    y:  24, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.6rem',
                        color: '#c9a96e',
                        fontWeight: 'bold',
                        position: 'absolute',
                    }}
                >
                    {String(value).padStart(2, '0')}
                </motion.span>
            </div>
            <span style={{
                fontSize: '0.6rem',
                color: '#c9a96e',
                opacity: 0.6,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
            }}>
        {label}
      </span>
        </div>
    );
}

function CountdownTimer() {
    const [time, setTime] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

    useEffect(() => {
        // Initialise et lance le timer
        const update = () => setTime(getTimeLeft());
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    // Tant que le timer n'est pas initialisé, on affiche un placeholder
    if (time === null) return <div style={{ height: '90px' }} />;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}
        >
            <CountdownUnit value={time.days}    label="Jours"    />
            <Dot />
            <CountdownUnit value={time.hours}   label="Heures"   />
            <Dot />
            <CountdownUnit value={time.minutes} label="Minutes"  />
            <Dot />
            <CountdownUnit value={time.seconds} label="Secondes" />
        </motion.div>
    );
}

function Dot() {
    return (
        <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ fontSize: '1.4rem', color: '#c9a96e', opacity: 0.5, marginBottom: '18px' }}
        >
            :
        </motion.span>
    );
}

// ─── Scrolling Ribbon ────────────────────────────────────────────────────────



// ─── HERO ────────────────────────────────────────────────────────────────────

export default function Hero() {
    return (
        <section className="hero">

            {/* Ruban en haut */}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.2rem',
                    padding: '2rem 1rem',
                }}
            >
                {/* Prénoms */}
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                >
                    Agathe & Calvin
                </motion.h1>

                {/* Date */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '0.9rem',
                        color: '#c9a96e',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        opacity: 0.8,
                    }}
                >
                    02 Août 2026
                </motion.p>

                {/* Compte à rebours */}
                <CountdownTimer />

                {/* Séparateur */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.4 }}
                    style={{
                        width: '120px',
                        height: '1px',
                        background: 'linear-gradient(to right, transparent, #c9a96e, transparent)',
                    }}
                />

                {/* Photo */}
                    <Image
                        src="/images/home.jpg"
                        alt="Agathe & Calvin"
                        width={280}
                        height={200}
                        style={{ display: 'block', objectFit: 'cover' }}
                    />
            </motion.div>

        </section>
    );
}
