import React, { useState, useEffect, useRef } from 'react';
import '../styles/RSVP.css';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:3001';

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  party_id?: number;
}

interface GuestFormData {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  attending?: 'yes' | 'no' | '';
  meal_choice?: string;
  dietary_restrictions?: string;
}

const RSVP: React.FC = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [guests, setGuests] = useState<Person[]>([]);

  // Form state for all guests in the party
  const [guestsFormData, setGuestsFormData] = useState<GuestFormData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!search) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetch(`${BACKEND_API_URL}/api/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: search }),
      })
        .then(res => res.json())
        .then(data => {
          setSuggestions(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 400);
  }, [search]);

  const handleBack = () => {
    setSelectedPerson(null);
    setSearch('');
    setSuggestions([]);
    setGuests([]);
    setGuestsFormData([]);
    setSubmitSuccess(null);
    setSubmitError(null);
    setActiveIndex(0);
  };

  const handleSelectPerson = async (person: Person) => {
    setSelectedPerson(person);
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/party`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ partyId: person.party_id }),
      });
      const data = await response.json();
      let guestList: Person[] = Array.isArray(data) ? data : [];
      // Ensure clicked guest is first
      guestList = [person, ...guestList.filter(g => g.id !== person.id)];
      setGuests(guestList);

      // Initialize form data from guest list
      const initialFormData: GuestFormData[] = guestList.map(g => ({
        id: g.id,
        first_name: g.first_name,
        last_name: g.last_name,
        email: g.email || '',
        attending: '',
        meal_choice: '',
        dietary_restrictions: ''
      }));
      setGuestsFormData(initialFormData);
      setActiveIndex(0);
    } catch (err) {
      // fallback to single guest
      setGuests([person]);
      setGuestsFormData([{
        id: person.id,
        first_name: person.first_name,
        last_name: person.last_name,
        email: person.email || '',
        attending: '',
        meal_choice: '',
        dietary_restrictions: ''
      }]);
    }
    setLoading(false);
  };

  const updateGuestField = (id: number, field: keyof GuestFormData, value: any) => {
    setGuestsFormData(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const allFieldsFilled = (): boolean => {
    if (guestsFormData.length === 0) return false;
    return guestsFormData.every(g => {
      const emailOk = typeof g.email === 'string' && g.email.trim() !== '';
      const attendingOk = g.attending === 'yes' || g.attending === 'no';
      const mealOk = typeof g.meal_choice === 'string' && g.meal_choice.trim() !== '';
      // dietary_restrictions is optional now
      return emailOk && attendingOk && mealOk;
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!allFieldsFilled()) return;
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/submit-rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guests: guestsFormData }),
      });
      if (!response.ok) throw new Error('Failed to submit RSVP');
      setSubmitSuccess('RSVP submitted successfully. Thank you!');
    } catch (err: any) {
      setSubmitError(err?.message || 'Error submitting RSVP');
    }
    setSubmitting(false);
  };

  if (!process.env.REACT_APP_RSVP_ENABLED) {
    return (
      <div className="Page rsvp">
        <p className='title'>RSVP</p>
        <div className="coming-soon">
          RSVP functionality is coming soon! Please check back later.
        </div>
      </div>
    );
  }

  return (
    <div className="Page rsvp">
      {/* <p className='title'>RSVP</p> */}
      {selectedPerson ? (
        <div className="rsvp-form-container">
          <button onClick={handleBack} className="back-button">Back</button>
          <h2>RSVP for {selectedPerson.first_name} {selectedPerson.last_name}'s Party</h2>

          {/* Tabs */}
          <div className="tabs">
            <ul className="tab-list">
              {guests.map((g, idx) => (
                <li
                  key={g.id}
                  className={`tab-item ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  {g.first_name}
                </li>
              ))}
            </ul>

            <form className="tab-content" onSubmit={handleSubmit}>
              {guestsFormData[activeIndex] ? (
                <>
                  <div className="form-row">
                    <label>Name</label>
                    <div className="value">{guestsFormData[activeIndex].first_name} {guestsFormData[activeIndex].last_name}</div>
                  </div>

                  <div className="form-row">
                    <label htmlFor={`email-${guestsFormData[activeIndex].id}`}>Email</label>
                    <input
                      id={`email-${guestsFormData[activeIndex].id}`}
                      type="email"
                      value={guestsFormData[activeIndex].email}
                      onChange={e => updateGuestField(guestsFormData[activeIndex].id, 'email', e.target.value)}
                    />
                  </div>

                  <div className="form-row">
                    <label>Attending</label>
                    <div className="value">
                      <label>
                        <input
                          type="radio"
                          name={`attending-${guestsFormData[activeIndex].id}`}
                          checked={guestsFormData[activeIndex].attending === 'yes'}
                          onChange={() => updateGuestField(guestsFormData[activeIndex].id, 'attending', 'yes')}
                        /> Yes
                      </label>
                      <label style={{ marginLeft: '1rem' }}>
                        <input
                          type="radio"
                          name={`attending-${guestsFormData[activeIndex].id}`}
                          checked={guestsFormData[activeIndex].attending === 'no'}
                          onChange={() => updateGuestField(guestsFormData[activeIndex].id, 'attending', 'no')}
                        /> No
                      </label>
                    </div>
                  </div>

                  <div className="form-row">
                    <label>Meal Choice</label>
                    <select
                      value={guestsFormData[activeIndex].meal_choice}
                      onChange={e => updateGuestField(guestsFormData[activeIndex].id, 'meal_choice', e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="pepperoni">Pepperoni</option>
                      <option value="cheese">Cheese</option>
                      <option value="meat-lovers">Meat Lover's</option>
                      <option value="veggie">Veggie</option>
                      <option value="bbq-chicken">BBQ Chicken</option>
                      <option value="no-preference">No preference</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <label>Dietary Restrictions</label>
                    <input
                      type="text"
                      value={guestsFormData[activeIndex].dietary_restrictions}
                      onChange={e => updateGuestField(guestsFormData[activeIndex].id, 'dietary_restrictions', e.target.value)}
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="prev-button"
                      disabled={activeIndex === 0}
                      onClick={() => setActiveIndex(i => Math.max(0, i - 1))}
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      className="next-button"
                      disabled={activeIndex === guests.length - 1}
                      onClick={() => setActiveIndex(i => Math.min(guests.length - 1, i + 1))}
                    >
                      Next
                    </button>

                    <button
                      type="submit"
                      className="submit-button"
                      disabled={!allFieldsFilled() || submitting}
                    >
                      {submitting ? 'Submitting...' : 'Submit RSVP'}
                    </button>
                  </div>

                  {submitSuccess && <div className="success-message">{submitSuccess}</div>}
                  {submitError && <div className="error-message">{submitError}</div>}
                </>
              ) : (
                <div>Loading form...</div>
              )}
            </form>
          </div>
        </div>
      ) : (
        <>
          <p className='title'>RSVP</p>
          <p className='rsvp-subtitle'>Please let us know if you can join us for our special day!</p>
          <input
            name="search"
            className="search-input"
            type="text"
            placeholder="Search your name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoComplete='off'
            style={{ width: '80vw', padding: '8px', marginBottom: '8px' }}
          />
          {loading && <div>Searching...</div>}
          {suggestions.length > 0 && (
            <ul className="suggestions-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {suggestions.map((person) => {
                const fullName = `${person.first_name} ${person.last_name}`;
                return (
                  <li
                    key={person.id}
                    className="suggestion-item"
                    onClick={() => handleSelectPerson(person)}
                  >
                    {fullName}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default RSVP;
