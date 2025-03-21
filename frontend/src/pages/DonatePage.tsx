// frontend/src/pages/DonatePage.tsx
import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DonationForm from '../components/DonationForm';
import api from '../services/api';
import './DonatePage.css';

// Stripe öffentlicher Schlüssel (sollte aus Umgebungsvariablen kommen)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '');

const DonatePage = () => {
    const [amount, setAmount] = useState<number>(5);
    const [email, setEmail] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const predefinedAmounts = [5, 10, 20, 50, 100];

    const handleAmountSelect = (selectedAmount: number) => {
        setAmount(selectedAmount);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value > 0) {
            setAmount(value);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleCreateDonation = async () => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            return;
        }

        if (amount <= 0) {
            alert('Bitte wählen Sie einen Betrag größer als 0.');
            return;
        }

        setIsProcessing(true);
        setPaymentStatus('processing');

        try {
            const response = await api.post('/donations', {
                amount,
                email,
            });

            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.error('Fehler beim Erstellen der Spende:', error);
            setPaymentStatus('error');
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePaymentSuccess = () => {
        setPaymentStatus('success');
        setClientSecret(null);
    };

    const handlePaymentError = () => {
        setPaymentStatus('error');
        setClientSecret(null);
    };

    return (
        <div className="donate-page">
            <div className="donate-container">
                <h1>Unterstützen Sie unser Projekt</h1>
                <p className="donate-intro">
                    Mit Ihrer Unterstützung können wir unser landwirtschaftliches Projekt
                    schneller realisieren und Ihnen bald frische, lokale Produkte liefern.
                </p>

                {paymentStatus === 'success' ? (
                    <div className="success-message">
                        <h2>Vielen Dank für Ihre Unterstützung!</h2>
                        <p>Ihre Spende hilft uns, unser Projekt zu realisieren.</p>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setPaymentStatus('idle')}
                        >
                            Neue Spende
                        </button>
                    </div>
                ) : (
                    <>
                        {!clientSecret ? (
                            <div className="donation-setup">
                                <div className="amount-selector">
                                    <h3>Wählen Sie einen Betrag</h3>
                                    <div className="predefined-amounts">
                                        {predefinedAmounts.map((presetAmount) => (
                                            <button
                                                key={presetAmount}
                                                className={`amount-btn ${amount === presetAmount ? 'selected' : ''}`}
                                                onClick={() => handleAmountSelect(presetAmount)}
                                            >
                                                {presetAmount}€
                                            </button>
                                        ))}
                                    </div>
                                    <div className="custom-amount">
                                        <label>Oder eigenen Betrag eingeben:</label>
                                        <div className="amount-input-wrapper">
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={handleAmountChange}
                                                min="1"
                                                step="1"
                                            />
                                            <span className="currency-symbol">€</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="email-input">
                                    <label htmlFor="email">Ihre E-Mail-Adresse:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="name@beispiel.de"
                                    />
                                </div>

                                <button
                                    className="btn btn-primary"
                                    onClick={handleCreateDonation}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? 'Bitte warten...' : 'Jetzt spenden'}
                                </button>
                            </div>
                        ) : (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <DonationForm
                                    amount={amount}
                                    onSuccess={handlePaymentSuccess}
                                    onError={handlePaymentError}
                                />
                            </Elements>
                        )}

                        {paymentStatus === 'error' && (
                            <div className="error-message">
                                Bei der Verarbeitung Ihrer Spende ist ein Fehler aufgetreten.
                                Bitte versuchen Sie es später erneut.
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default DonatePage;