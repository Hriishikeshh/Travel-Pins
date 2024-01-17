// Import necessary styles and libraries
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL from "react-map-gl";
import { useState } from "react";

// Access Mapbox API token from environment variables
const token = process.env.REACT_APP_MAPBOX;

// Define the main App component
function App() {

  // Set initial state for the viewport using the 'useState' hook
  const [viewPort, setViewPort] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 6,
  });

  // Return the JSX for rendering the component
  return (
    <div style={{ width: "100vw" , height:"100vh" }}>

      {/* Render the ReactMapGL component with specified props */}
      <ReactMapGL
        {...viewPort}
        mapboxAccessToken={token}
        height="100%"
        width="100%"
        mapStyle="mapbox://styles/hrizz0210/clrhuix2500ls01pidm63e3wb"
      ></ReactMapGL>

    </div>
  );
}

// Export the App component as the default export
export default App;
