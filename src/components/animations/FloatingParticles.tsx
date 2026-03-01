'use client';

import { motion } from 'framer-motion';

const PARTICLES = [
    { id: 0,  symbol: '✿', fontSize: 0.9, initialX: -80, animateX: -60,  duration: 3.2, delay: 0 },
    { id: 1,  symbol: '❀', fontSize: 1.1, initialX: -50, animateX: -90,  duration: 4.1, delay: 0.4 },
    { id: 2,  symbol: '✾', fontSize: 0.8, initialX: -20, animateX: 10,   duration: 3.7, delay: 0.8 },
    { id: 3,  symbol: '❁', fontSize: 1.3, initialX: 10,  animateX: -30,  duration: 4.5, delay: 1.2 },
    { id: 4,  symbol: '✦', fontSize: 0.9, initialX: 40,  animateX: 70,   duration: 3.0, delay: 1.6 },
    { id: 5,  symbol: '✧', fontSize: 1.0, initialX: 70,  animateX: 40,   duration: 4.2, delay: 2.0 },
    { id: 6,  symbol: '✿', fontSize: 1.2, initialX: 90,  animateX: 60,   duration: 3.5, delay: 0.2 },
    { id: 7,  symbol: '❀', fontSize: 0.8, initialX: -90, animateX: -50,  duration: 4.8, delay: 0.6 },
    { id: 8,  symbol: '✾', fontSize: 1.1, initialX: -40, animateX: 20,   duration: 3.3, delay: 1.0 },
    { id: 9,  symbol: '❁', fontSize: 0.9, initialX: 20,  animateX: -10,  duration: 4.0, delay: 1.4 },
    { id: 10, symbol: '✦', fontSize: 1.3, initialX: 60,  animateX: 90,   duration: 3.8, delay: 1.8 },
    { id: 11, symbol: '✧', fontSize: 0.8, initialX: 100, animateX: 80,   duration: 4.3, delay: 2.2 },
];

export default function FloatingParticles() {
    return (
        <div
            style={{
                position: 'relative',
                height: '70px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'visible',
                marginBottom: '0.5rem',
            }}
        >
            {PARTICLES.map((p) => (
                <motion.span
                    key={p.id}
                    initial={{ opacity: 0, y: 0, x: p.initialX }}
                    animate={{
                        opacity: [0, 1, 0],
                        y: [-10, -70],
                        x: [p.initialX, p.animateX],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeOut',
                    }}
                    style={{
                        position: 'absolute',
                        fontSize: `${p.fontSize}rem`,
                        color: '#c9a96e',
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    {p.symbol}
                </motion.span>
            ))}
        </div>
    );
}
