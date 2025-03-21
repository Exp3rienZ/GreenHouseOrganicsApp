// frontend/src/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <img src="/logo.svg" alt="Hofladen Abo" />
                    <span className="logo-text">Hofladen Abo</span>
                </Link>

                <button className="menu-toggle" onClick={toggleMenu}>
                    <span className={`menu-icon ${menuOpen ? 'open' : ''}`}></span>
                </button>

                <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
                                Startseite
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link" onClick={() => setMenuOpen(false)}>
                                Registrieren
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/donate" className="nav-link" onClick={() => setMenuOpen(false)}>
                                Unterstützen
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;