import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth, googleProvider } from './firebase';
import Login from './Login';
import UserSelectionPage from './UserSelectionPage';
import Sidebar from './Sidebar';
import DonationRequest from './DonationRequest';
import RestaurantDonationForm from './RestaurantDonationForm.js';
import Restaurant from './Restaurant';
import RestaurantEdit from './RestaurantEdit';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
//import LeafletMap from './Leaflet';

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoggedIn(!!user);
      if (user) {
        setUserProfile({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = () => {
    auth.signInWithRedirect(googleProvider);
  };

  const handleUserSelect = (userType) => {
    console.log('Selected user type:', userType);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login onGoogleLogin={handleGoogleLogin} />} />
          <Route path="/user-selection" element={loggedIn ? (
              <>
                <Sidebar userProfile={userProfile} />
                <UserSelectionPage onUserSelect={handleUserSelect} />
              </>
            ) : (
              <Navigate to="/login" replace />
            )}
          />
          <Route path="/donation-request" element={<DonationRequest />} />
          <Route path="/restaurant-donation-form" element={<RestaurantDonationForm />} />
          <Route path="/restaurant" element={<Restaurant/>} />
          <Route path="/restaurantEdit" element={<RestaurantEdit/>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;