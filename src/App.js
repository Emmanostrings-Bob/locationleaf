import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css"; // Import your custom styles
import { Icon } from "leaflet";

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [mapMode, setMapMode] = useState("default");

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5591/5591266.png",
    iconSize: [38, 38],
  });

  const GoToLocation = ({ coords }) => {
    const map = useMap();
    map.flyTo(coords, 18, {
      duration: 2,
    });
    return null;
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setUserLocation({ latitude, longitude, accuracy });
      },
      (error) => {
        alert("Failed to get current location. Please try again later.");
        console.error(error);
      }
    );
  };

  const changeMapMode = (mode) => {
    setMapMode(mode);
  };

  const renderTileLayer = () => {
    switch (mapMode) {
      case "default":
        return (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        );
      case "satellite":
        return (
          <TileLayer
            attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a><strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a ></strong'
            url="https://api.mapbox.com/styles/v1/stringsbob/clw1w9qr7011201pfbtbj6gpk/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3RyaW5nc2JvYiIsImEiOiJjbHZ4dXNkdHIwaHBxMmlwZG54ZDB2YWU1In0.kgncYJ4itWWAPia_JzfGoA"
          />
        );
      case "dark":
        return (
          <TileLayer
            attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a><strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a ></strong'
            url="https://api.mapbox.com/styles/v1/stringsbob/clw1webna02gs01qv31gq230b/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3RyaW5nc2JvYiIsImEiOiJjbHZ4dXNkdHIwaHBxMmlwZG54ZDB2YWU1In0.kgncYJ4itWWAPia_JzfGoA"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="get-location-button">
        <button className="button" onClick={getLocation}>
          Get My Location
        </button>
        <button className="button" onClick={() => changeMapMode("default")}>
          Default Mode
        </button>
        <button className="button" onClick={() => changeMapMode("satellite")}>
          Satellite Mode
        </button>
        <button className="button" onClick={() => changeMapMode("dark")}>
          Dark Mode
        </button>
      </div>
      <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={false}>
        {renderTileLayer()}
        {userLocation && (
          <>
            <Marker position={[userLocation.latitude, userLocation.longitude]} icon={customIcon}>
              <Popup>
                Your Location <br />
                Latitude: {userLocation.latitude.toFixed(6)} <br />
                Longitude: {userLocation.longitude.toFixed(6)} <br />
                Accuracy: {userLocation.accuracy.toFixed(2)} meters
              </Popup>
            </Marker>
            <Circle
              center={[userLocation.latitude, userLocation.longitude]}
              radius={100}
              fillColor="red"
              fillOpacity={0.3}
              stroke={false}
            />
          </>
        )}
        {userLocation && <GoToLocation coords={[userLocation.latitude, userLocation.longitude]} />}
      </MapContainer>
    </div>
  );
};

export default App;



