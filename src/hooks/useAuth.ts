import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    console.log('useAuth effect ran, token is', token); // Debugging line
    // Check if token is null and print
    console.log("is token null?", token === null);
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    fetch(`${BACKEND_API_URL}/api/status`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setIsAuthenticated(data.isAuthenticated); 
        console.log('useAuth effect ran, data is', data);
      })
      .catch(() => {
        setIsAuthenticated(false);
        console.log("CATCH BLOCK - PROMISE REJECTED")
      });
  }, []);

  console.log('useAuth returning:', isAuthenticated); // Debugging line

  return isAuthenticated;
}