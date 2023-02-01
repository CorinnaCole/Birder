import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '@iconify/react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import AccountPage from './AccountPage.jsx';
import { FaGoogle, FaKiwiBird } from 'react-icons/fa';
import UserSignUp from './UserSignUp.jsx';
import chirp from '../assets/birds-chirping-04-6771.mp3';
import {Container, LandingButton, GreetingAndLogo} from '../styled/StyledLogInPageComponents.jsx';


const LogInPage = ({ setGlobalUser, globalUser }) => {
  const [addUserToggle, setAddUserToggle] = useState(false);
  const history = useHistory();
  const audio = new Audio(chirp);
  audio.loop = true;

  const play = () => {
    audio.play();
  };

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const logoutWithRedirect = () => logout({
    returnTo: window.location.origin,
  });

  const login = () => {
    loginWithRedirect({});
  };

  useEffect(() => {
    if (user) {
      setGlobalUser(user);
      axios.get('/userInfo', { params: { email: user.email } })
        .then((data) => {
          if (data.data[0] !== undefined) {
            history.push('/birdList');
            console.log('send to account page');
          } else {
            console.log('DATA IN ELSE', data);
            history.push('/createUser');
            console.log('send to create user page');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const addUser = () => {
    setAddUserToggle(true);
  };

  return (
    <>
      {!isAuthenticated
        && (
          <Container>
            <GreetingAndLogo className="outermotion">
              <h1>Welcome back to Birder.</h1>
              <FaKiwiBird/>
              <h2>Log in to see your feathered friends</h2>

            </GreetingAndLogo>
            <LandingButton
              onClick={() => login()}>
              <FaGoogle />
              Continue with Google
            </LandingButton>
          </Container>
        )}
      {isAuthenticated
        && (
          <AccountPage
            logoutWithRedirect={logoutWithRedirect}
            globalUser={globalUser}
            setGlobalUser={setGlobalUser}
          />
        )}
    </>
  );
};

export default LogInPage;