// import React, { useState, } from 'react';

// function App() {
//   const [coords, setCoords] = useState({ latitude: null, longitude: null });
//   const [address, setAddress] = useState(null);
//   const [accuracy, setAccuracy] = useState(null);

//   const getLocation = () => {
//     if (!navigator.geolocation) {
//       alert('Geolocation is not supported by your browser.');
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude, accuracy } = position.coords;
//         setCoords({ latitude, longitude });
//         setAccuracy(accuracy);
//       },
//       (error) => {
//         alert('Failed to get current location. Please try again later.');
//         console.error(error);
//       }
//     );
//   };



//   return (
//     <div className="App">
//       <h2>My location</h2>
//       <button onClick={getLocation}>Get coordinates</button>
//       <h4>Coordinates</h4>
//       <p>Latitude: {coords.latitude}</p>
//       <p>Longitude: {coords.longitude}</p>
//       <p>Accuracy: {accuracy} meters</p>
//       <p>Address: {address}</p>
//     </div>
//   );
// }

// export default App

import React, { useState } from 'react';

function App() {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [accuracy, setAccuracy] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setCoords({ latitude, longitude });
        setAccuracy(accuracy);
        setError(null); // Clear any previous errors
      },
      (error) => {
        setError('Failed to get current location. Please try again later.');
        console.error(error);
      }
    );
  };

  return (
    <div className="App">
      <h2>My location</h2>
      <button onClick={getLocation}>Get coordinates</button>
      <h4>Coordinates</h4>
      {error && <p>{error}</p>}
      {!error && (
        <>
          <p>Latitude: {coords.latitude}</p>
          <p>Longitude: {coords.longitude}</p>
          <p>Accuracy: {accuracy} meters</p>
        </>
      )}
    </div>
  );
}

export default App;
