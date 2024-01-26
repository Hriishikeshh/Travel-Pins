import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker,Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Room,Star } from '@material-ui/icons';
import "./app.css"
import axios from "axios";
import {format} from "timeago.js";
import Register from './components/Register';
import Login from './components/Login';




function App2() {
  const [currentUser,setCurrentUser] = useState(null);
  const[pins,setpins] = useState([])
  const[currentPlaceId, setCurrentPlaceId]= useState(null);
  const[newPlace, setNewPlace]= useState(null);
  const [viewport, setViewport] = useState({
    zoom: 8,
  });

  const [showRegister,setShowRegister]=useState(false);
  const [showLogin,setShowLogin]=useState(false);

  const[title, setTitle]= useState(null);
  const[desc, setDesc]= useState(null);
  const[rating, setRating]= useState();
 

  // Function to handle zoom based on scroll event
  const handleScroll = (event) => {
    const newZoom = event.deltaY > 0 ? viewport.zoom - 1 : viewport.zoom + 1;
    const clampedZoom = Math.min(Math.max(newZoom, 1), 20);

    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: clampedZoom,
    }));
  };

  //handle marker click
  const handlemarkerclick = (id,lat,long)=>{
    setCurrentPlaceId(id);
  };

  useEffect(()=>{
    const getPins = async()=>{
      try{
        const res=await axios.get("/pins");
        setpins(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getPins();
  },[]);

  //double click
  const handleAddClick = (e)=> {
    const long = e.lngLat.lng;
    const lat = e.lngLat.lat;
    setNewPlace({
      lat,
      long,
    });
  }

  //handling the submit pin
  const handleSubmit = async (e) => {
    e.preventDefault();  // avoids page refresh after submit
    const newPin = {
      user:currentUser,
      title,
      desc,
      rating,
      lat:newPlace.lat,
      long:newPlace.long
    }

    //send this response to backend and add to backend
    try{
      const res = await axios.post("/pins", newPin);
      setpins([...pins,res.data]); 
      setNewPlace(null);

    }catch(err){
      console.log(err)
    }


  }

  return (
    <div
      style={{ width: '100vw', height: '100vh', zIndex: 999 }}
      onWheel={handleScroll}
    >
      <ReactMapGL 
        {...viewport}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/hrizz0210/clriyx0nm000n01pbh5suaxcj"
        onDblClick={handleAddClick}
        transitionDuration="400"
      >
        <Register />
        {Array.isArray(pins) && 
        pins.map(p => (
          <>
          <Marker latitude={p.lat} longitude={p.long} offsetLeft={-viewport.zoom * 7} offsetTop={-viewport.zoom * 3.5}>
            <Room style={{ fontSize: viewport.zoom * 3.5,color: p.username === currentUser ? "slateblue":'red', cursor:"pointer"}} 
            onClick={()=> handlemarkerclick(p._id,p.lat,p.long)}/>
          </Marker>
          
          {p._id === currentPlaceId && (
          <Popup
            key={p._id}
            latitude={p.lat}
            longitude={p.long}
            anchor="bottom"
            closeButton={true}
            closeOnClick={false}
            onClose={()=> setCurrentPlaceId(null)}
            >
            <div className='card'>
              <label>Place</label>
              <h4 className='place'>{p.title}</h4>
              <label>Review</label>
              <p className='desc'>{p.desc}</p>
              <label>Rating</label>
              <div className="stars">
                {Array.from({ length: p.rating }, (_, index) => (
                  <Star key={index} className='star' />
                ))}
              </div>
              <label>Information</label>
              <span className='username'>created by <b>{p.username}</b></span>
              <span className='date'>{format(p.createdAt)}</span>
            </div>
          </Popup>
          )}</>
        ))}
        {newPlace && (
        <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            anchor="bottom"
            closeButton={true}
            closeOnClick={false}
            onClose={()=> setNewPlace(null)}
          >
            <div>

              <form onSubmit={handleSubmit}>
                <label>title</label>
                <input placeholder='any title?' onChange={(e) => setTitle(e.target.value)}></input>
                <label>Review</label>
                <textarea placeholder='say something about this place' onChange={(e) => setDesc(e.target.value)}></textarea>
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                
                <button className='submitButton' type='submit'>Add Pin</button>
              </form>
            </div>
            </Popup>
          )}
          
          {currentUser ? (<button className='button logout'>Log out</button>):
          (<><div><button className='button login'onClick={() => setShowLogin(true)}>login</button> 
          <button className='button register' onClick={() => setShowRegister(true)}>Register</button></div></>)}
          
          {showRegister && <Register />
          {showLogin && <Login />}
      </ReactMapGL>
    
      
    </div>
  );
}

export default App2;
