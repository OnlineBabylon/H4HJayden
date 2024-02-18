import { useNavigate } from 'react-router-dom'; // Import useNavigate
import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import {
    doc, 
    collection,
    query,
    where,
    onSnapshot,
    getDocs, 
    deleteDoc,
} from 'firebase/firestore';
import { db } from './firebaseconfig'; // Adjust this path


var init = 0;

function RestaurantEdit()
{
    const [donations, setDonations] = useState([]);
    const [deleteID, setDeleteID] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    }

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

    const deleteForm = document.querySelector('.delete')
    if (deleteForm)
    {
        deleteForm.addEventListener('submit',(e) => 
        {
            e.preventDefault()

            const formRef = doc(db, 'donations', deleteForm.id.value)
            deleteDoc(formRef)
                .then(() => {
                    deleteForm.reset()
                })
        })
    }

    return (
        <form class="delete">
        <input type="text" name="id" placeholder = "Enter ID to be deleted" required></input>
        <button>Delete</button>
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
        </form>
      );
}

export default RestaurantEdit;
