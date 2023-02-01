import React, { useState, useEffect } from 'react';
import '../assets/App.css';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LogInPage from './LogInPage.jsx';
import ImageUpload from '../imageUpload/ImageUpload.jsx'

const App = ({ globalUser, setGlobalUser }) => (
  <>
    <video autoPlay loop muted id="video">
      <source src={require('./assets/ducksVideo.mp4').default} type="video/mp4" />
    </video>

    <LogInPage
      globalUser={globalUser}
      setGlobalUser={setGlobalUser} />
  </>
);

export default App;
