import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { googleMapsApiKey } from '../secrets.js';
//will need a a get to get geo loc of all bird pictures related to that bird, create an array as follows and then map through the array
// the center location should be set to where the user's picture was located to.

const Map = ({birdArrayLocations}) => {
  console.log('here is the props location handed down to maps: ', birdArrayLocations)
  const [locArray, setLocArray] = useState([]);
  const [mapCenter, setMapCenter] =useState({});


  const modifyLocations = (arr) => {
    return arr.map((item, index) => {
      const newObj = {};
      newObj.name = `Sighting ${index + 1}`
      newObj.location = item
    });
  }
  useEffect(()=> {
    if (birdArrayLocations && birdArrayLocations.length > 0) {
      // changedLocArr = modifyLocations(birdArrayLocations);
      // setLocArray(changedLocArr);
      setMapCenter(birdArrayLocations[0]);
    }

  }, [])
  // const locations = [
  //   {
  //     name: "Location 1",
  //     location: {
  //       lat: 41.3954,
  //       lng: 2.162
  //     },
  //   },
  //   {
  //     name: "Location 2",
  //     location: {
  //       lat: 41.3917,
  //       lng: 2.1649
  //     },
  //   },
  //   {
  //     name: "Location 3",
  //     location: {
  //       lat: 41.3773,
  //       lng: 2.1585
  //     },
  //   },
  //   {
  //     name: "Location 4",
  //     location: {
  //       lat: 41.3797,
  //       lng: 2.1682
  //     },
  //   },
  //   {
  //     name: "Location 5",
  //     location: {
  //       lat: 41.4055,
  //       lng: 2.1915
  //     },
  //   }
  // ];
  const mapStyles = {
    height: "50vh",
    width: "100%"
  };

  // const defaultCenter =


  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={mapCenter}>
        {birdArrayLocations.map(item => {
            return (
              <Marker position={item} />
            )
          })
        }
      </GoogleMap>
    </LoadScript>

  )

};

export default Map;
// navigator.geolocation.getCurrentPosition((position) => {
//   console.log('Latitude is :', position.coords.latitude);
//   console.log('Longitude is :', position.coords.longitude);
//   setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
// });