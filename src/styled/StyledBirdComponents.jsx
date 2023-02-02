import styled, { css } from 'styled-components';

const BirdPageDiv = styled.div`
  display: flex;
  position: relative;
  top: 280px;
  width: 100%
`;

const AddBirdButton = styled.button`
  position: absolute;
  top: -30px;
  left: 50%;
  width: 200px;
  height: 48px;
  background-color: #953553;
  font-family: Manrope,Arial,sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  color: #fff;
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-size: 24px;
  background-position: 16px;
  border: 0;
  padding: 0 12px;
`;

const CardDiv = styled.div`
  border-radius: 9999px;
`;

export {
  BirdPageDiv,
  AddBirdButton
}
