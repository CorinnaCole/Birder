import styled, { css } from 'styled-components';
import beeEatersImg from '../assets/bee-eaters.jpeg';

const NavBar = styled.nav`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  height: 60px;
  line-height: 60px;
  width: 100%;
  background-color: white;
`;

const NavBarWrapper = styled.div`
margin: auto;
text-align: center;
width: 85%;
`;

const LogoBox = styled.div`
  float: left;
  margin-left: 28px;
  font-size: 1.5em;
  height: 60px;
  letter-spacing: 1px;
  text-transform: uppercase;
  svg{
    font-size: 2em;
    color: #32690f;
  }
`;

const NavBarList = styled.ul`
display: inline-block;
float: right;
list-style: none;
margin-top: -2px;
text-align: right;
transition: transform 0.5s ease-out;
-webkit-transition: transform 0.5s ease-out;
`;

const NavLink = styled.li`
  display: inline-block;
  color: #32690f;
  font-size: 0.7em;
  font-weight: bold;
  height: 50px;
  letter-spacing: 1px;
  margin: 0 20px;
  padding: 0 4px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  :hover {
    cursor: pointer;
    color: black;
    transition: all 1s ease;
    -webkit-transition: all 1s ease;
  }
`;

const HeroDiv =styled.div`
  background-image: url(${beeEatersImg});
  background-size: 100%;
  background-position: 0% 20%;
  box-sizing: border-box;
  position: fixed;
  top: 60px;
  height: 220px;
  width: 100%;
  background-color: #32690f;
`;

export {
  NavBar,
  NavBarWrapper,
  LogoBox,
  NavBarList,
  NavLink,
  HeroDiv
}