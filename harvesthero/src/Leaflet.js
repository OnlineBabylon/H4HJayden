import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import restaurantMarkerIcon from './pin.png'; 

const LeafletMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([37.349526422884885, -121.93695270483332], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapRef.current = map;

      fetchRestaurants(37.349526422884885, -121.93695270483332);
    }

    return () => {
      // Cleanup code if necessary
    };
  }, []);

  const fetchRestaurants = (latitude, longitude) => {
    fetch(`http://localhost:3000/yelp-api/restaurants?latitude=${latitude}&longitude=${longitude}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant data');
        }
        return response.json();
      })
      .then(data => {
        data.businesses.forEach(business => {
          // Create a custom marker with the restaurant's icon
          const customIcon = L.icon({
            iconUrl: restaurantMarkerIcon,
            iconSize: [30, 30], // Adjust the size of the marker icon as needed
          });

          L.marker([business.coordinates.latitude, business.coordinates.longitude], { icon: customIcon })
            .addTo(mapRef.current)
            .bindPopup(`<b>${business.name}</b><br>${business.location.address1}<br>Rating: ${business.rating}`);
        });
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
      });
  };

  return <div id="map" style={{ height: '100vh' }}></div>;
};

export default LeafletMap;
