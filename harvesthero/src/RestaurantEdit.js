import { useNavigate } from 'react-router-dom'; // Import useNavigate
import React, { useState, useEffect } from 'react';
import {
    doc, 
    collection,
    query,
    where,
    onSnapshot,
    getDocs
} from 'firebase/firestore';
import { db } from './firebaseconfig'; // Adjust this path

function RestaurantEdit()
{
    const navigate = useNavigate(); // Initialize useNavigate
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchDonations = async () => {
          const donationsCollection = collection(db, 'donations');
          const donationsSnapshot = await getDocs(donationsCollection);
          const donationsList = donationsSnapshot.docs.map(doc => doc.data());
          setDonations(donationsList);
        };
    
        fetchDonations();
      }, []);

    const handleUserSelect = (userType) => {
        switch(userType) {
        /*case 'volunteer':
            navigate('/donation-request');
            break;
        */
        case 'back':
            navigate('/restaurant');
            break;
        /*case 'make':
            navigate('/donation-request');
            break;
        */
        default:
            console.log('Invalid user type:', userType);
        }
    };

    return (
        <div>
        <br></br>
        <button onClick={() => handleUserSelect('back')}>back</button>
          <h2>All Donations</h2>
          {donations.map((donation, index) => (
            <div key={index}>
              <h3>Donation {index + 1}</h3>
              <pre>{JSON.stringify(donation, null, 2)}</pre>
            </div>
          ))}
        </div>
      );
}

export default RestaurantEdit;