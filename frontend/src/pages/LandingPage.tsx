// frontend/src/pages/LandingPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import api from '../services/api';
import './LandingPage.css';

interface RegistrationStats {
    totalRegistrations: number;
    targetRegistrations: number;
    progressPercentage: number;
}

const LandingPage = () => {
    const [stats, setStats] = useState<RegistrationStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/auth/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Fehler beim Laden der Statistiken:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="landing-page">
            <section className="hero">
                <div className="hero-content">
                    <h1>Frisches, lokales Gemüse direkt zu Ihrer Tür</h1>
                    <p>
                        Unser landwirtschaftliches Unternehmen bietet Ihnen wöchentliche Lieferungen
                        von frischem, saisonalem Gemüse, Obst, Kulturpilzen und Kräutern
                        in Form von individuell zusammenstellbaren Abo-Kisten.
                    </p>
                    <div className="cta-buttons">
                        <Link to="/register" className="btn btn-primary">
                            Jetzt vorregistrieren
                        </Link>
                        <Link to="/donate" className="btn btn-secondary">
                            Projekt unterstützen
                        </Link>
                    </div>
                </div>
            </section>

            <section className="how-it-works">
                <h2>So funktioniert's</h2>
                <div className="steps">
                    <div className="step">
                        <div className="step-icon">1</div>
                        <h3>Registrieren</h3>
                        <p>Melden Sie sich an und werden Teil unserer Community.</p>
                    </div>
                    <div className="step">
                        <div className="step-icon">2</div>
                        <h3>Kiste zusammenstellen</h3>
                        <p>Wählen Sie frische Produkte nach Ihrem Geschmack.</p>
                    </div>
                    <div className="step">
                        <div className="step-icon">3</div>
                        <h3>Wöchentliche Lieferung</h3>
                        <p>Erhalten Sie frische Produkte direkt an Ihre Tür oder holen Sie sie ab.</p>
                    </div>
                </div>
            </section>

            <section className="registration-progress">
                <h2>Unser Finanzierungsziel</h2>
                <p>
                    Wir benötigen mindestens 100 Vorregistrierungen, um unser Projekt zu starten.
                    Helfen Sie uns, dieses Ziel zu erreichen!
                </p>

                {loading ? (
                    <p>Lade Statistiken...</p>
                ) : stats ? (
                    <div className="stats-container">
                        <ProgressBar percentage={stats.progressPercentage} />
                        <p className="stats-text">
                            {stats.totalRegistrations} von {stats.targetRegistrations} Registrierungen
                            ({Math.round(stats.progressPercentage)}%)
                        </p>
                    </div>
                ) : (
                    <p>Statistiken konnten nicht geladen werden.</p>
                )}

                <Link to="/register" className="btn btn-primary">
                    Jetzt vorregistrieren
                </Link>
            </section>

            <section className="products-preview">
                <h2>Unser Angebot (Vorschau)</h2>
                <div className="product-categories">
                    <div className="category">
                        <h3>Gemüse</h3>
                        <p>Frisch und saisonal von unseren Feldern.</p>
                    </div>
                    <div className="category">
                        <h3>Obst</h3>
                        <p>Süß und reif zur perfekten Zeit.</p>
                    </div>
                    <div className="category">
                        <h3>Kulturpilze</h3>
                        <p>Aromatisch und nährstoffreich.</p>
                    </div>
                    <div className="category">
                        <h3>Kräuter</h3>
                        <p>Frisch und geschmacksintensiv.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;