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
// import {Container, LandingButton, GreetingAndLogo} from '../styled/styledComponents';

const Container = styled.div`
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  align-content: space-evenly;
  height: 500px;
  width: 500px;
  background-color: white;
  border-radius: 25px;
  padding: 26px;
  justify-items: center;
`;


const LandingButton = styled.button`
  height: 100px;
  width: 200px;
  background-color: #6497ef;
  font-family: Manrope,Arial,sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  color: #fff;
  height: 48px;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-size: 24px;
  background-position: 16px;
  width: 60%;
  border: 0;
  padding: 0 12px;
  svg {
    padding-right: 10px;
  }
`;

const GreetingAndLogo = styled.div`
  color: #32690f;
  svg {
    font-size: 5em;
    color: #32690f
  }
`

const Landing = ({ setGlobalUser, globalUser }) => {
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
            history.push('/user');
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

export default Landing;