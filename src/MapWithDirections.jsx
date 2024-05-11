import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';

const MapWithDirections = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  const handleGoButtonClick = () => {
    // Calculate route and update state
    // Code to calculate route using a routing service
    const calculatedRoute = [
      [userLocation[0], userLocation[1]], // Starting point
      [/* Next point */],
      // Add more points along the route
    ];
    setRoute(calculatedRoute);
  };

  return (
    <MapContainer center={userLocation} zoom={13} style={{ height: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLocation && <Marker position={userLocation} />}
      {route.length > 0 && <Polyline positions={route} color="blue" />}
      <button onClick={handleGoButtonClick}>Go</button>
    </MapContainer>
  );
};

export default MapWithDirections;
