// frontend/src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './RegisterPage.css';

interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Fehler zurücksetzen beim Tippen
        if (errors[name as keyof RegisterFormData]) {
            setErrors({
                ...errors,
                [name]: undefined,
            });
        }
    };

    const validateForm = () => {
        const newErrors: Partial<RegisterFormData> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Vorname ist erforderlich';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Nachname ist erforderlich';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'E-Mail ist erforderlich';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'E-Mail ist ungültig';
        }

        if (formData.password && formData.password.length < 8) {
            newErrors.password = 'Passwort muss mindestens 8 Zeichen lang sein';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwörter stimmen nicht überein';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Passwort aus dem Request entfernen, wenn es leer ist
            const requestData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                ...(formData.password ? { password: formData.password } : {}),
            };

            await api.post('/auth/register', requestData);
            setSubmitSuccess(true);

            // Nach erfolgreicher Registrierung zur Startseite umleiten
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error: any) {
            if (error.response && error.response.data) {
                if (error.response.data.message === 'E-Mail bereits registriert') {
                    setErrors({
                        ...errors,
                        email: 'Diese E-Mail ist bereits registriert',
                    });
                } else {
                    setErrors({
                        ...errors,
                        email: error.response.data.message,
                    });
                }
            } else {
                setErrors({
                    ...errors,
                    email: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="register-page">
                <div className="success-message">
                    <h2>Registrierung erfolgreich!</h2>
                    <p>Vielen Dank für Ihre Registrierung. Sie werden in Kürze zur Startseite weitergeleitet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="register-page">
            <div className="register-container">
                <h1>Vorregistrierung</h1>
                <p className="register-intro">
                    Registrieren Sie sich jetzt, um einer der ersten Kunden zu sein und
                    wöchentlich frische Produkte direkt von unserem Hof zu erhalten.
                </p>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label htmlFor="firstName">Vorname*</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={errors.firstName ? 'error' : ''}
                        />
                        {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Nachname*</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={errors.lastName ? 'error' : ''}
                        />
                        {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-Mail*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Passwort (optional)</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <div className="error-message">{errors.password}</div>}
                        <small>Wenn Sie jetzt ein Passwort festlegen, können Sie sich später leichter anmelden.</small>
                    </div>

                    {formData.password && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Passwort bestätigen</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? 'error' : ''}
                            />
                            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Bitte warten...' : 'Jetzt registrieren'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;