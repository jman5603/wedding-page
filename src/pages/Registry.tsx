import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Registry.css';
import honeymoon from '../resources/honeymood-fund.jpg';

interface RegistryItem {
  id: string | number;
  title?: string;
  item_name?: string; // From database
  description?: string;
  image?: string;
  image_url?: string; // From database
  link?: string;
  item_url?: string; // From database
  price?: number; // From database
  amount_wanted?: number; // From database
  amount_purchased?: number; // From database
  isExternal?: boolean;
}

const staticRegistryItems: RegistryItem[] = [
  {
    id: 'honeymoon-fund',
    title: 'Honeymoon Fund',
    description: 'Help us create unforgettable memories on our honeymoon',
    image: honeymoon,
    link: '/honeymoon-fund',
    isExternal: false
  }
];

const Registry: React.FC = () => {
  const [registryItems, setRegistryItems] = useState<RegistryItem[]>(staticRegistryItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(null);

  const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchRegistryItems = async () => {
      try {
        const response = await fetch(`${BACKEND_API_URL}/api/items`);
        if (!response.ok) {
          throw new Error('Failed to fetch registry items');
        }
        const apiItems = await response.json();
        
        // Combine static items (honeymoon fund) with API items
        const combinedItems = [...staticRegistryItems, ...apiItems];
        setRegistryItems(combinedItems);
      } catch (err) {
        console.error('Error fetching registry items:', err);
        setError('Failed to load registry items');
        // Keep static items even if API fails
        setRegistryItems(staticRegistryItems);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistryItems();
  }, []);

  // Helper function to get the display name
  const getItemTitle = (item: RegistryItem): string => {
    return item.title || item.item_name || 'Unknown Item';
  };

  // Helper function to get the image source
  const getItemImage = (item: RegistryItem): string => {
    return item.image || item.image_url || '';
  };

  // Helper function to get the description
  const getItemDescription = (item: RegistryItem): string => {
    let desc = item.description || '';
    
    // For database items, add price and availability info
    if (item.price && item.amount_wanted) {
      const remaining = (item.amount_wanted || 0) - (item.amount_purchased || 0);
      desc += ` • $${item.price}`;
      if (remaining > 0) {
        desc += ` • ${remaining} needed`;
      } else {
        desc += ` • Fully funded!`;
      }
    }
    
    return desc;
  };

  // Helper function to get the link
  const getItemLink = (item: RegistryItem): string => {
    return item.link || item.item_url || '#';
  };

  // Helper function to check if item is fully funded
  const isItemFullyFunded = (item: RegistryItem): boolean => {
    if (!item.amount_wanted || !item.amount_purchased) return false;
    return item.amount_purchased >= item.amount_wanted;
  };

  // Handle external link click and show purchase dialog
  const handleExternalLinkClick = (item: RegistryItem) => {
    // Open external link in new tab
    window.open(getItemLink(item), '_blank', 'noopener,noreferrer');
    
    // Show purchase confirmation dialog
    setSelectedItemId(item.id);
    setShowPurchaseDialog(true);
  };

  // Handle purchase confirmation
  const handlePurchaseConfirmation = async (purchased: boolean) => {
    if (purchased && selectedItemId) {
      try {
        const response = await fetch(`${BACKEND_API_URL}/api/purchase`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId: selectedItemId }),
        });

        if (!response.ok) {
          throw new Error('Failed to update purchase count');
        }

        // Refresh the registry items to show updated counts
        const updatedResponse = await fetch(`${BACKEND_API_URL}/api/items`);
        if (updatedResponse.ok) {
          const apiItems = await updatedResponse.json();
          const combinedItems = [...staticRegistryItems, ...apiItems];
          setRegistryItems(combinedItems);
        }
      } catch (err) {
        console.error('Error updating purchase count:', err);
        setError('Failed to update purchase count');
      }
    }

    // Close dialog and reset state
    setShowPurchaseDialog(false);
    setSelectedItemId(null);
  };

  if (loading) {
    return (
      <div className="Page">
        <p className='title'>Our Wedding Registry</p>
        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading registry items...</p>
      </div>
    );
  }

  return (
    <div className="Page registry">
      <p className='title'>Our Wedding Registry</p>
      <p className="registry-subtitle">Thank you for celebrating with us! Your presence is the greatest gift, but if you'd like to contribute to our new life together, here are some ways to help:</p>
      
      {error && (
        <p style={{ textAlign: 'center', color: '#e74c3c', padding: '1rem' }}>
          {error}
        </p>
      )}
      
      <div className="registry-grid">
        {registryItems.map((item) => (
          <div key={item.id} className="registry-item">
            <div className="registry-item-image">
              <img src={getItemImage(item)} alt={getItemTitle(item)} />
            </div>
            <div className="registry-item-content">
              <h3>{getItemTitle(item)}</h3>
              <p>{getItemDescription(item)}</p>
              {isItemFullyFunded(item) ? (
                <button 
                  className="registry-button disabled"
                  disabled
                  style={{ cursor: 'not-allowed', opacity: 0.6 }}
                >
                  Fully Funded
                </button>
              ) : (item.isExternal !== false && item.item_url) ? (
                <button
                  onClick={() => handleExternalLinkClick(item)}
                  className="registry-button"
                >
                  View Item
                </button>
              ) : item.link ? (
                <Link to={item.link} className="registry-button">
                  Contribute
                </Link>
              ) : (
                <button
                  onClick={() => handleExternalLinkClick(item)}
                  className="registry-button"
                >
                  View Item
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Confirmation Dialog */}
      {showPurchaseDialog && (
        <div className="purchase-dialog-overlay">
          <div className="purchase-dialog">
            <h3>Purchase Confirmation</h3>
            <p>
              Did you complete the purchase of this item?
            </p>
            <div className="purchase-dialog-buttons">
              <button
                onClick={() => handlePurchaseConfirmation(true)}
                className="registry-button purchase-dialog-button confirm"
              >
                Yes, I purchased it
              </button>
              <button
                onClick={() => handlePurchaseConfirmation(false)}
                className="registry-button purchase-dialog-button cancel"
              >
                No, I didn't purchase it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registry;
