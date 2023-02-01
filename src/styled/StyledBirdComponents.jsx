import styled, { css } from 'styled-components';

const BirdPageDiv = styled.div`
  margin: 280px 25px 0px 25px;
  position: relative;
`;

const AddBirdButton = styled.button`
  position: absolute;
  top: -30px;
  left: 50%;
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
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-size: 24px;
  background-position: 16px;
  width: 60%;
  border: 0;
  padding: 0 12px;
`;

export {
  BirdPageDiv,
  AddBirdButton
}
