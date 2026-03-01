'use client';

import { motion } from 'framer-motion';

interface AnimatedDividerProps {
    icon?: string;
    lineWidth?: number;
    color?: string;
    gap?: number;
}

export default function AnimatedDivider({
                                            icon = '❦',
                                            lineWidth = 80,
                                            color = '#c9a96e',
                                            gap = 16,
                                        }: AnimatedDividerProps) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: `${gap}px`,
                marginBottom: '1.5rem',
            }}
        >
            {/* Ligne gauche */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                style={{
                    width: `${lineWidth}px`,
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${color})`,
                    transformOrigin: 'right center',
                }}
            />

            {/* Icône centrale */}
            <motion.span
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    type: 'spring',
                    stiffness: 150,
                }}
                whileHover={{
                    scale: 1.3,
                    rotate: 15,
                    transition: { duration: 0.2 },
                }}
                style={{
                    fontSize: '1.8rem',
                    color: color,
                    display: 'block',
                    cursor: 'default',
                    userSelect: 'none',
                }}
            >
                {icon}
            </motion.span>

            {/* Ligne droite */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
                style={{
                    width: `${lineWidth}px`,
                    height: '1px',
                    background: `linear-gradient(90deg, ${color}, transparent)`,
                    transformOrigin: 'left center',
                }}
            />
        </div>
    );
}
