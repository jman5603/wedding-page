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

const RSVP: React.FC = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [guests, setGuests] = useState<Person[]>([]);
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
    } catch (err) {
      setGuests([person]);
    }
    setLoading(false);
  };

  return (
    <div className="Page rsvp">
      <p className='title'>RSVP</p>
      {selectedPerson ? (
        <>
          <button onClick={handleBack} className="back-button">Back</button>
          <h2>RSVP for {selectedPerson.first_name} {selectedPerson.last_name}</h2>
          {/* guests array is available for use in the RSVP form */}
          <pre>{JSON.stringify(guests, null, 2)}</pre>
        </>
      ) : (
        <>
          <p>Please let us know if you can join us for our special day!</p>
          <input
            name="search"
            className="search-input"
            type="text"
            placeholder="Search your name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoComplete='off'
            style={{ width: '80vw',padding: '8px', marginBottom: '8px' }}
          />
          {loading && <div>Searching...</div>}
          {suggestions.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
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
