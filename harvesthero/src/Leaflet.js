import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import restaurantMarkerIcon from './pin.png';
import { OpenStreetMapProvider } from 'leaflet-geosearch';


const LeafletMap = () => {
  const mapRef = useRef(null);
  const circleRef = useRef(null);
  const [radius, setRadius] = useState(1000); // Initial radius value

  useEffect(() => {
    const fetchRestaurants = (latitude, longitude, radius) => {
      // Clear previous markers and circle
      mapRef.current.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
          mapRef.current.removeLayer(layer);
        }
      });

      fetch(`http://localhost:3000/yelp-api/restaurants?latitude=${latitude}&longitude=${longitude}&radius=${radius}`)
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

          // Draw circle overlay
          circleRef.current = L.circle([latitude, longitude], { radius }).addTo(mapRef.current);

          // Adjust zoom level based on radius
          const zoomLevel = calculateZoomLevel(radius);
          mapRef.current.setView([latitude, longitude], zoomLevel);
        })
        .catch(error => {
          console.error('Error fetching data from backend:', error);
        });
    };

    if (!mapRef.current) {
      const map = L.map('map').setView([37.349526422884885, -121.93695270483332], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapRef.current = map;
    }

    fetchRestaurants(37.349526422884885, -121.93695270483332, radius);

    return () => {
      // Cleanup code if necessary
    };
  }, [radius]); // Re-run useEffect when radius changes

  const calculateZoomLevel = (radius) => {
    // You can adjust this function based on your requirements
    if (radius <= 500) {
      return 15;
    } else if (radius <= 1000) {
      return 14;
    } else if (radius <= 2000) {
      return 13;
    } else {
      return 12;
    }
  };

  const handleRadiusChange = (event) => {
    const newRadius = parseInt(event.target.value);
    setRadius(newRadius);
    if (circleRef.current) {
      circleRef.current.setRadius(newRadius);
    }
  }

  return (
    <div>
      <input type="range"  min="100" max="5000" value={radius} onChange={handleRadiusChange} />
      <div id="map" style={{ height: '80vh' }}></div>
    </div>
  );
};

export default LeafletMap;