import styled, { css } from 'styled-components';
import React from 'react';


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

/*
original:
const Container = styled.div`
  display: grid;
  justify-content: center;
  align-content: space-evenly;
  height: 500px;
  width: 500px;
  background-color: #686868;
  border:solid;
  border-radius: 25px;
  box-shadow: 5px 5px 10px;
  opacity: .95;
`;
*/

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

export {
  LandingButton,
  GreetingAndLogo,
  Container
};