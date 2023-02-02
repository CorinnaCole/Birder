import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {FaKiwiBird } from 'react-icons/fa'
import {
  NavBar,
  NavBarWrapper,
  LogoBox,
  NavBarList,
  NavLink,
  HeroDiv} from '../styled/StyledNavComponents.jsx';


const Header = ({ globalUser, setGlobalUser, userID, setUserID })=> {
  const history = useHistory();
  const { logout, user } = useAuth0();
  const logoutWithRedirect = () => logout({
    returnTo: window.location.origin,
  });

  const handleLogOut = () => {
    setUserID(0);
    setGlobalUser({});
    logoutWithRedirect();
  }
  return (
    <>
    <NavBar>
      <NavBarWrapper>
        <LogoBox>
          <FaKiwiBird  onClick={() => history.push('/birdList')}/>
        </LogoBox>
        <NavBarList>
          <NavLink onClick={()=> history.push('/user')}> Account</NavLink>
          <NavLink onClick={() => history.push('/friendsList')}> Community </NavLink>
          <NavLink onClick={() => history.push('/discover')}> Discover </NavLink>
          <NavLink  onClick={handleLogOut}> Logout </NavLink>
        </NavBarList>
      </NavBarWrapper>
    </NavBar>
    <HeroDiv />
    </>
  )
};

export default Header;

