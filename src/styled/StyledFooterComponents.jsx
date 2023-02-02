import styled, { css } from 'styled-components';

const FooterDiv = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95%;
  height: 30px;
  line-height: 30px;
  width: 100%;
  background-color: white;
`;


const LogoBox = styled.div`
  float: left;
  margin-left: 28px;
  font-size: 1em;
  height: 30px;
  letter-spacing: 1px;
  text-transform: uppercase;
  svg{
    font-size: 2em;
    color: white;
  }
`;

const FooterList = styled.ul`
display: inline-block;
float: right;
list-style: none;
margin-top: -2px;
text-align: right;
transition: transform 0.5s ease-out;
-webkit-transition: transform 0.5s ease-out;
`;

const FooterLink = styled.li`
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


export {
  FooterDiv,
  FooterList,
  FooterLink
}