'use client';

import { motion } from 'framer-motion';

interface AnimatedInitialsProps {
    firstName?: string;
    secondName?: string;
    color?: string;
}

// ✅ Valeurs fixes pré-calculées — pas de Math.random()
const STARS = [
    { id: 0, left: '5%',  top: '15%', delay: 0,    size: 0.8 },
    { id: 1, left: '15%', top: '45%', delay: 0.35, size: 0.6 },
    { id: 2, left: '25%', top: '75%', delay: 0.7,  size: 0.9 },
    { id: 3, left: '35%', top: '15%', delay: 1.05, size: 0.5 },
    { id: 4, left: '45%', top: '45%', delay: 1.4,  size: 0.7 },
    { id: 5, left: '55%', top: '75%', delay: 1.75, size: 0.8 },
    { id: 6, left: '65%', top: '15%', delay: 2.1,  size: 0.6 },
    { id: 7, left: '75%', top: '45%', delay: 2.45, size: 0.9 },
    { id: 8, left: '85%', top: '75%', delay: 2.8,  size: 0.5 },
    { id: 9, left: '95%', top: '15%', delay: 3.15, size: 0.7 },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};

const letterVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.5 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring' as const,
            stiffness: 200,
            damping: 14,
        },
    },
};

export default function AnimatedInitials({
                                             firstName = 'Agathe',
                                             secondName = 'Calvin',
                                             color = '#c9a96e',
                                         }: AnimatedInitialsProps) {
    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                paddingTop: '16px',
                paddingBottom: '24px',
                overflow: 'visible',
            }}
        >
            {/* ✅ Étoiles avec valeurs fixes */}
            {STARS.map((star) => (
                <motion.span
                    key={star.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: 'easeInOut',
                    }}
                    style={{
                        position: 'absolute',
                        left: star.left,
                        top: star.top,
                        fontSize: `${star.size}rem`,
                        color: color,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    ✦
                </motion.span>
            ))}

            {/* Prénom 1 — lettre par lettre */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    display: 'flex',
                    gap: '2px',
                }}
            >
                {firstName.split('').map((char, i) => (
                    <motion.span
                        key={i}
                        variants={letterVariants}
                        whileHover={{
                            scale: 1.2,
                            color: '#e8c98a',
                            transition: { duration: 0.15 },
                        }}
                        style={{
                            fontFamily: "'Playfair Display', 'Georgia', serif",
                            fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
                            color: color,
                            cursor: 'default',
                            userSelect: 'none',
                            lineHeight: 1.1,
                            display: 'inline-block',
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.div>

            {/* Séparateur & */}
            <motion.span
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                    duration: 0.8,
                    delay: 0.6,
                    type: 'spring',
                    stiffness: 150,
                }}
                whileHover={{
                    scale: 1.3,
                    rotate: 15,
                    transition: { duration: 0.2 },
                }}
                style={{
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                    color: color,
                    opacity: 0.7,
                    cursor: 'default',
                    userSelect: 'none',
                    lineHeight: 1,
                }}
            >
                ✦ & ✦
            </motion.span>

            {/* Prénom 2 — lettre par lettre */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    display: 'flex',
                    gap: '2px',
                }}
            >
                {secondName.split('').map((char, i) => (
                    <motion.span
                        key={i}
                        variants={letterVariants}
                        whileHover={{
                            scale: 1.2,
                            color: '#e8c98a',
                            transition: { duration: 0.15 },
                        }}
                        style={{
                            fontFamily: "'Playfair Display', 'Georgia', serif",
                            fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
                            color: color,
                            cursor: 'default',
                            userSelect: 'none',
                            lineHeight: 1.1,
                            display: 'inline-block',
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.div>

            {/* Trait décoratif bas */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: 'easeInOut' }}
                style={{
                    width: '160px',
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    transformOrigin: 'center',
                    marginTop: '8px',
                }}
            />
        </div>
    );
}
