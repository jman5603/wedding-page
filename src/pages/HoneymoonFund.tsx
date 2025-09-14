import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import '../styles/Payment.css';
import '../styles/HoneymoonFund.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

interface HoneymoonCheckoutFormProps {
  amount: string;
  clientSecret: string;
  donorInfo: {
    isAnonymous: boolean;
    firstName: string;
    lastName: string;
  };
  onBackToAmount: () => void;
}

const HoneymoonCheckoutForm: React.FC<HoneymoonCheckoutFormProps> = ({ 
  amount, 
  clientSecret, 
  donorInfo,
  onBackToAmount 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs" as const,
  };

  return (
    <div className="payment-form-container">
      <h3>Contributing ${amount} to Our Honeymoon</h3>
      <div className="donor-info-display">
        <p><strong>Gift from:</strong> {donorInfo.isAnonymous ? 'Anonymous' : `${donorInfo.firstName} ${donorInfo.lastName}`}</p>
      </div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button 
          disabled={isLoading || !stripe || !elements} 
          id="submit"
          type="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              `Contribute $${amount}`
            )}
          </span>
        </button>
      </form>
      
      <button 
        onClick={onBackToAmount}
        className="back-button"
        type="button"
      >
        Change Amount or Name
      </button>

      {message && <div id="payment-message">{message}</div>}
    </div>
  );
};

const HoneymoonFund: React.FC = () => {
  const [amount, setAmount] = useState<string>('50');
  const [clientSecret, setClientSecret] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [paymentIntentCreated, setPaymentIntentCreated] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    isAnonymous: false,
    firstName: '',
    lastName: ''
  });

  const createPaymentIntent = async (amountInCents: number) => {
    const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:3001';
    
    try {
      const response = await fetch(`${BACKEND_API_URL}/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: [{ 
            id: "honeymoon-fund", 
            amount: amountInCents 
          }],
          // Send donor information to backend for Stripe metadata
          donor: donorInfo.isAnonymous ? 
            { type: 'anonymous' } : 
            { 
              type: 'named',
              firstName: donorInfo.firstName,
              lastName: donorInfo.lastName
            }
        }),
      });
      
      const data = await response.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setPaymentIntentCreated(true);
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      setMessage('Error setting up payment. Please try again.');
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setPaymentIntentCreated(false);
      setClientSecret('');
    }
  };

  const handleSetAmount = () => {
    const amountNum = parseFloat(amount);
    if (amountNum && amountNum >= 1) {
      // Validate donor information
      if (!donorInfo.isAnonymous && (!donorInfo.firstName.trim() || !donorInfo.lastName.trim())) {
        setMessage('Please enter your first and last name, or select anonymous.');
        return;
      }
      
      const amountInCents = Math.round(amountNum * 100);
      createPaymentIntent(amountInCents);
    } else {
      setMessage('Please enter a valid amount (minimum $1.00)');
    }
  };

  const handleBackToAmount = () => {
    setPaymentIntentCreated(false);
    setClientSecret('');
    setMessage(null);
  };

  const appearance = {
    theme: 'stripe' as const,
  };

  return (
    <div className="Page honeymoon-fund-page">
      <p className="title">Honeymoon Fund</p>
      
      <div className="honeymoon-content">
        <div className="honeymoon-description">
          <h2>Help Us Create Magical Memories</h2>
          <p>
            Your presence at our wedding is the greatest gift we could ask for! 
            If you'd like to contribute to our honeymoon adventure, any amount 
            would be deeply appreciated and will help us create unforgettable 
            memories together.
          </p>
          
          <div className="honeymoon-details">
            <h3>Our Honeymoon Plans</h3>
            <p>
              We're planning a romantic getaway to Europe. Your 
              contribution will help us enjoy special experiences, romantic 
              dinners, and adventures that we'll treasure forever.
            </p>
          </div>
        </div>

        <div className="payment-section">
          {!paymentIntentCreated ? (
            <div className="amount-selector">
              <h3>Choose Your Contribution Amount</h3>
              <div className="amount-input-group">
                <span className="currency-symbol">$</span>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="50.00"
                  className="amount-input"
                />
              </div>
              
              <div className="preset-amounts">
                <button 
                  onClick={() => setAmount('25')} 
                  className="preset-button"
                  type="button"
                >
                  $25
                </button>
                <button 
                  onClick={() => setAmount('50')} 
                  className="preset-button"
                  type="button"
                >
                  $50
                </button>
                <button 
                  onClick={() => setAmount('100')} 
                  className="preset-button"
                  type="button"
                >
                  $100
                </button>
                <button 
                  onClick={() => setAmount('200')} 
                  className="preset-button"
                  type="button"
                >
                  $200
                </button>
              </div>

              {/* Donor Information Section */}
              <div className="donor-info-section">
                <h4>Gift Information</h4>
                <div className="donor-option">
                  <label className="donor-radio-label">
                    <input
                      type="radio"
                      name="donorType"
                      checked={donorInfo.isAnonymous}
                      onChange={() => setDonorInfo({ isAnonymous: true, firstName: '', lastName: '' })}
                    />
                    <span>Give anonymously</span>
                  </label>
                </div>
                <div className="donor-option">
                  <label className="donor-radio-label">
                    <input
                      type="radio"
                      name="donorType"
                      checked={!donorInfo.isAnonymous}
                      onChange={() => setDonorInfo({ ...donorInfo, isAnonymous: false })}
                    />
                    <span>Share my name</span>
                  </label>
                </div>
                
                {!donorInfo.isAnonymous && (
                  <div className="name-inputs">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={donorInfo.firstName}
                      onChange={(e) => setDonorInfo({ ...donorInfo, firstName: e.target.value })}
                      className="name-input"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={donorInfo.lastName}
                      onChange={(e) => setDonorInfo({ ...donorInfo, lastName: e.target.value })}
                      className="name-input"
                    />
                  </div>
                )}
              </div>

              <button 
                onClick={handleSetAmount}
                className="set-amount-button"
                type="button"
              >
                Continue to Payment
              </button>

              {message && <div id="payment-message">{message}</div>}
            </div>
          ) : (
            clientSecret && (
              <Elements 
                stripe={stripePromise} 
                options={{ clientSecret, appearance }}
              >
                <HoneymoonCheckoutForm 
                  amount={amount}
                  clientSecret={clientSecret}
                  donorInfo={donorInfo}
                  onBackToAmount={handleBackToAmount}
                />
              </Elements>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HoneymoonFund;
