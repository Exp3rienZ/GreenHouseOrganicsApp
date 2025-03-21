// frontend/src/components/DonationForm.tsx
import React, { useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import './DonationForm.css';

interface DonationFormProps {
    amount: number;
    onSuccess: () => void;
    onError: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ amount, onSuccess, onError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hat noch nicht geladen
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/donate/success`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'Ein Fehler ist aufgetreten.');
            onError();
        } else {
            onSuccess();
        }

        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="donation-form">
            <div className="form-header">
                <h3>Spendenbetrag: {amount.toFixed(2)}€</h3>
                <p>Bitte geben Sie Ihre Zahlungsinformationen ein.</p>
            </div>

            <div className="payment-element-container">
                <PaymentElement />
            </div>

            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary"
                disabled={!stripe || isSubmitting}
            >
                {isSubmitting ? 'Wird verarbeitet...' : 'Zahlung abschließen'}
            </button>
        </form>
    );
};

export default DonationForm;