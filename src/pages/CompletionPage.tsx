import React, { useState, useEffect } from 'react';
import { useStripe } from "@stripe/react-stripe-js";
import '../styles/CompletionPage.css';

const CompletionPage: React.FC = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    <>
      {message && (
        <div className="Page">
          <div className="completion">
            <p className="title">Payment Status</p>
            <div className="completion-message">{message}</div>
          </div>
        </div>
      )}
      {!message && (<div className="Page">
        <div className="completion">
          <p className="title">Loading...</p>
        </div>
      </div>)}
    </>
  );
};

export default CompletionPage;
