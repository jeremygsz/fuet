'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Heart } from 'lucide-react';

interface LoginProps {
    onLogin: (password: string) => boolean;
}

export default function Login({ onLogin }: LoginProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = onLogin(password);
        if (!success) {
            setError(true);
            setErrorMsg('Mot de passe incorrect');
            setTimeout(() => setError(false), 1000);
        }
    };

    return (
        <div className="login-container">
            <motion.div
                className="login-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="login-icon"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <Heart size={60} color="#EC950C" fill="#EC950C" />
                </motion.div>

                <h1>Bienvenue</h1>
                <p className="login-subtitle">
                    Entrez le code d'accès pour voir les détails de notre mariage
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <Lock className="input-icon" size={18} />
                        <input
                            type="password"
                            placeholder="Code d'accès"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={error ? 'error' : ''}
                            autoFocus
                        />
                    </div>
                    {errorMsg && <p className="error-message">{errorMsg}</p>}
                    <motion.button
                        type="submit"
                        className="login-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Accéder au site
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
