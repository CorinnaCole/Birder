import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { googleMapsApiKey } from '../secrets.js';
import {
  MapContainer
} from './styled/StyledMapComponents.jsx';


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
      setMapCenter(birdArrayLocations[0]);
    }

  }, [])

  const mapStyles = {
    height: "100%",
    width: "100%"
  };


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
