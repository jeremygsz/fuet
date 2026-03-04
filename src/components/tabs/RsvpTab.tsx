'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

interface FormData {
    firstName: string;
    lastName: string;
    mairie: number;
    afterMairie: number;
    houppa: number;
    petitDejeuner: number;
    comment: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
}

const eventFields = [
    { key: 'mairie', label: 'Mairie', emoji: '⚖️' },
    { key: 'afterMairie', label: 'After Mairie', emoji: '🥂' },
    { key: 'houppa', label: 'Houppa & Soirée', emoji: '💍' },
    { key: 'petitDejeuner', label: 'Brunch', emoji: '☀️' },
] as const;

type EventKey = typeof eventFields[number]['key'];

export default function RsvpTab() {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        mairie: 0,
        afterMairie: 0,
        houppa: 0,
        petitDejeuner: 0,
        comment: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
        if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTextChange = (field: 'firstName' | 'lastName', value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleCountChange = (field: EventKey, delta: number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: Math.max(0, Math.min(20, prev[field] + delta)),
        }));
    };

    const handleNumberInput = (field: EventKey, value: string) => {
        const num = parseInt(value) || 0;
        setFormData((prev) => ({
            ...prev,
            [field]: Math.max(0, Math.min(20, num)),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setIsSuccess(true);
            } else {
                setSubmitError(data.error || 'Une erreur est survenue');
            }
        } catch {
            setSubmitError('Erreur de connexion. Veuillez réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleModify = () => {
        setIsSuccess(false);
    };

    if (isSuccess) {
        return (
            <section className="rsvp-section">
                <motion.div
                    className="rsvp-form"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                >
                    <div className="success-message">
                        <div className="success-icon">🎉</div>
                        <h3>Merci {formData.firstName} !</h3>
                        <p>Votre réponse a bien été enregistrée.</p>
                        <p>Nous avons hâte de fêter ce moment avec vous !</p>
                        <div style={{ marginTop: '1.5rem', opacity: 0.7, fontSize: '0.9rem' }}>
                            {eventFields.map((ef) => {
                                const count = formData[ef.key];
                                if (count === 0) return null;
                                return (
                                    <p key={ef.key}>
                                        {ef.emoji} {ef.label} : {count} personne{count > 1 ? 's' : ''}
                                    </p>
                                );
                            })}
                        </div>
                        <button className="success-modify-btn" onClick={handleModify}>
                            Modifier ma réponse
                        </button>
                    </div>
                </motion.div>
            </section>
        );
    }

    return (
        <section className="rsvp-section">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Confirmer votre présence
            </motion.h2>
            <p className="rsvp-subtitle">
                Merci de remplir ce formulaire afin que nous puissions organiser
                au mieux notre journée avec vous. ❤️
            </p>

            <motion.form
                className="rsvp-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {/* Identité */}
                <p className="form-section-title">Vos informations</p>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName">Prénom *</label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="Votre prénom"
                            value={formData.firstName}
                            onChange={(e) => handleTextChange('firstName', e.target.value)}
                            className={errors.firstName ? 'has-error' : ''}
                        />
                        {errors.firstName && (
                            <span className="field-error">{errors.firstName}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Nom *</label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Votre nom"
                            value={formData.lastName}
                            onChange={(e) => handleTextChange('lastName', e.target.value)}
                            className={errors.lastName ? 'has-error' : ''}
                        />
                        {errors.lastName && (
                            <span className="field-error">{errors.lastName}</span>
                        )}
                    </div>
                </div>

                {/* Événements */}
                <p className="form-section-title">Nombre de personnes par événement</p>
                <p style={{ opacity: 0.6, fontSize: '0.85rem', marginBottom: '1.25rem', marginTop: '-0.75rem' }}>
                    Indiquez 0 si vous ne participez pas à cet événement
                </p>

                <div className="events-grid">
                    {eventFields.map((ef) => (
                        <div key={ef.key} className="event-input-card">
                            <div className="event-input-label">
                                <span className="event-emoji">{ef.emoji}</span>
                                {ef.label}
                            </div>
                            <div className="count-input-wrapper">
                                <button
                                    type="button"
                                    className="count-btn"
                                    onClick={() => handleCountChange(ef.key, -1)}
                                    disabled={formData[ef.key] === 0}
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    min={0}
                                    max={20}
                                    value={formData[ef.key]}
                                    onChange={(e) => handleNumberInput(ef.key, e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="count-btn"
                                    onClick={() => handleCountChange(ef.key, 1)}
                                    disabled={formData[ef.key] === 20}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label htmlFor="comment">Commentaire (optionnel)</label>
                    <textarea
                        id="comment"
                        placeholder="Un message, une allergie, une remarque..."
                        value={formData.comment}
                        onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                        rows={3}
                        style={{ width: '100%', resize: 'vertical' }}
                    />
                </div>
                {submitError && (
                    <motion.p
                        className="error-message"
                        style={{ textAlign: 'center', marginTop: '1rem' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        ⚠️ {submitError}
                    </motion.p>
                )}

                <motion.button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Envoi en cours...
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            Confirmer ma présence
                        </>
                    )}
                </motion.button>
            </motion.form>
        </section>
    );
}
