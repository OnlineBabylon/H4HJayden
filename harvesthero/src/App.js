import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import UserSelectionPage from './UserSelectionPage';
import Sidebar from './Sidebar';
import DonationRequest from './DonationRequest';
import RestaurantDonationForm from './RestaurantDonationForm.js';
import Restaurant from './Restaurant';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import LeafletMap from './Leaflet';
import DonationsList from './DonationList'; // Adjust the import path as necessary

function App() {
  const addresses = [
    { name: 'Place 1', lat: 40.7128, lng: -74.0060 },
    { name: 'Place 2', lat: 40.7138, lng: -74.0010 },
    // Add more addresses within your radius
  ];

  return (
    <div>
        <LeafletMap center={[40.7128, -74.0060]} zoom={13} addresses={addresses} />
        <DonationsList />

        </div>

  );
}

export default App;
