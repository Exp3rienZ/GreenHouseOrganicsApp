// frontend/src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Über uns</h3>
                        <p>
                            Wir sind ein neu gegründetes landwirtschaftliches Unternehmen,
                            das sich auf den lokalen Anbau und die Vermarktung von frischem Gemüse,
                            Obst, Kulturpilzen und Kräutern spezialisiert.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h3>Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Startseite</Link></li>
                            <li><Link to="/register">Registrieren</Link></li>
                            <li><Link to="/donate">Unterstützen</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Kontakt</h3>
                        <address>
                            Hofladen Abo GmbH<br />
                            Beispielstraße 123<br />
                            12345 Musterstadt<br />
                            <a href="mailto:info@hofladen-abo.de">info@hofladen-abo.de</a>
                        </address>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Hofladen Abo. Alle Rechte vorbehalten.</p>
                    <div className="legal-links">
                        <Link to="/impressum">Impressum</Link> |
                        <Link to="/datenschutz">Datenschutz</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;