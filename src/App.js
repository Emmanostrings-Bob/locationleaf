// import React, { useState } from 'react';

// function App() {
//   const [coords, setCoords] = useState({ latitude: null, longitude: null });
//   const [accuracy, setAccuracy] = useState(null);
//   const [error, setError] = useState(null);

//   const getLocation = () => {
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by your browser.');
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude, accuracy } = position.coords;
//         setCoords({ latitude, longitude });
//         setAccuracy(accuracy);
//         setError(null); // Clear any previous errors
//       },
//       (error) => {
//         setError('Failed to get current location. Please try again later.');
//         console.error(error);
//       }
//     );
//   };

//   return (
//     <div className="App">
//       <h2>My location</h2>
//       <button onClick={getLocation}>Get coordinates</button>
//       <h4>Coordinates</h4>
//       {error && <p>{error}</p>}
//       {!error && (
//         <>
//           <p>Latitude: {coords.latitude}</p>
//           <p>Longitude: {coords.longitude}</p>
//           <p>Accuracy: {accuracy} meters</p>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
// import React from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "./App.css"; // Import your custom styles
// import { Icon } from "leaflet";
// import MarkerClusterGroup  from "react-leaflet-cluster";

// const App = () => {
// 	const markers = [
// 		{
// 			geocode: [6.599984, 3.2483156],
// 			popUp: "Yo, I am pop 1",
// 		},
// 		{
// 			geocode: [6.6195, 3.2999],
// 			popUp: "Yo, I am pop 2",
// 		},
// 		{
// 			geocode: [6.6018743, 3.2417158],
// 			popUp: "Yo, I am pop 3",
// 		},
// 	];

// 	const customIcon = new Icon({
// 		iconUrl: "https://cdn-icons-png.flaticon.com/512/5591/5591266.png",
// 		iconSize: [38, 38],
// 	});
// 	return (
// 		<div className="App">
// 			<MapContainer
// 				center={[6.5244, 3.3792]}
// 				zoom={13}
// 				scrollWheelZoom={false}
// 			>
// 				<TileLayer
// 					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// 					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           backgroundColor="black"
// 				/>

//         <MarkerClusterGroup>
//             {markers.map((marker) => (
//               <Marker position={marker.geocode} icon={customIcon}>
//                 <Popup>{marker.popUp}</Popup>
//               </Marker>
//             ))}
//         </MarkerClusterGroup>

// 			</MapContainer>
// 		</div>
// 	);
// };

// export default App;
import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css"; // Import your custom styles
import { Icon } from "leaflet";

const App = () => {
  const [userLocation, setUserLocation] = useState(null);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5591/5591266.png",
    iconSize: [38, 38],
  });

  // Custom hook to set the map view to user's location
  const GoToLocation = ({ coords }) => {
    const map = useMap();
    map.flyTo(coords, 15, {
      duration: 2, // Transition duration in seconds
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

  return (
    <div className="App">
      <div className="get-location-button">
        <button className="button" onClick={getLocation}>Get My Location</button>
      </div>
      <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]} icon={customIcon}>
            <Popup>
              Your Location <br />
              Latitude: {userLocation.latitude.toFixed(6)} <br />
              Longitude: {userLocation.longitude.toFixed(6)} <br />
              Accuracy: {userLocation.accuracy.toFixed(2)} meters
            </Popup>
          </Marker>
        )}
        {userLocation && <GoToLocation coords={[userLocation.latitude, userLocation.longitude]} />}
      </MapContainer>
    </div>
  );
};

export default App;



