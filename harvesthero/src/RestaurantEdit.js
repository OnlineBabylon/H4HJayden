import { useNavigate } from 'react-router-dom'; // Import useNavigate
import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";

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
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
    }
    
    const navigate = useNavigate(); // Initialize useNavigate
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchDonations = async () => {
          const donationsCollection = collection(db, 'donations');
          const q = query(donationsCollection, where("email", "==", user.email))
          onSnapshot(q, (snapshot) => {
                let restaurantDonations = []
                snapshot.docs.forEach((doc) => {
                    restaurantDonations.push({...doc.data(), id: doc.id})
                })
                console.log(restaurantDonations)
                setDonations(restaurantDonations)
          })
          /*
          const donationsSnapshot = await getDocs(donationsCollection);
          const donationsList = donationsSnapshot.docs.map(doc => doc.data());
          setDonations(donationsList);
          */
        };
        fetchDonations();
      }, []);


    
    const handleUserSelect = (userType) => {
        switch(userType) {
        case 'back':
            navigate('/restaurant');
            break;
        default:
            console.log('Invalid user type:', userType);
        }
    };


    return (
        <div>
        <br></br>
        <button onClick={() => handleUserSelect('back')}>back</button>
        <br></br><br></br><br></br>
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
