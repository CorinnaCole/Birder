import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {FaKiwiBird } from 'react-icons/fa'
import {
  NavBar,
  NavBarWrapper,
  LogoBox,
  NavBarList,
  NavLink,
  HeroDiv} from '../styled/StyledNavComponents.jsx';


const Header = ()=> {
  return (
    <>
    <NavBar>
      <NavBarWrapper>
        <LogoBox>
          <FaKiwiBird/>
        </LogoBox>
        <NavBarList>
          <NavLink> Account  </NavLink>
          <NavLink> Community </NavLink>
          <NavLink> Discover </NavLink>
          <NavLink> Logout </NavLink>
        </NavBarList>
      </NavBarWrapper>
    </NavBar>
    <HeroDiv />
    </>
  )
};

export default Header;