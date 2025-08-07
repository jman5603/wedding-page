import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Registry.css';
import honeymoon from '../resources/honeymood-fund.jpg';

interface RegistryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  isExternal?: boolean;
}

const registryItems: RegistryItem[] = [
  {
    id: 'honeymoon-fund',
    title: 'Honeymoon Fund',
    description: 'Help us create unforgettable memories on our honeymoon',
    image: honeymoon,
    link: '/honeymoon-fund',
    isExternal: false
  },
  {
    id: 'amazon-registry',
    title: 'Amazon Registry',
    description: 'Our complete wedding registry on Amazon',
    image: '/images/amazon-placeholder.jpg', // You'll need to add this image
    link: 'https://amazon.com/your-registry-link', // Replace with your actual Amazon registry link
    isExternal: true
  },
  {
    id: 'target-registry',
    title: 'Target Registry',
    description: 'Home essentials and more at Target',
    image: '/images/target-placeholder.jpg', // You'll need to add this image
    link: 'https://target.com/your-registry-link', // Replace with your actual Target registry link
    isExternal: true
  }
];

const Registry: React.FC = () => (
  <div className="Page">
    <p className='title'>Our Wedding Registry</p>
    <p className="registry-subtitle">Thank you for celebrating with us! Your presence is the greatest gift, but if you'd like to contribute to our new life together, here are some ways to help:</p>
    
    <div className="registry-grid">
      {registryItems.map((item) => (
        <div key={item.id} className="registry-item">
          <div className="registry-item-image">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="registry-item-content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.isExternal ? (
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="registry-button"
              >
                View Registry
              </a>
            ) : (
              <Link to={item.link} className="registry-button">
                Contribute
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Registry;
