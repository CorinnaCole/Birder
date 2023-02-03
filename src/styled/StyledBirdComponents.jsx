import styled, { css } from 'styled-components';

const BirdPageDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  top: 280px;
  width: 100%;
  padding: 15px;
`;

const CardHolderDiv = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const AddBirdButton = styled.button`
  position: relative;
  top: -20px;
  left: 50%;
  width: 200px;
  height: 48px;
  border: 1px solid #D7942E;
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
  padding: 0 12px;
`;

const CardDiv = styled.div`
  height: 350px;
  width: 400px;
`;

const ImgDiv = styled.div`
  border-radius: 9999px;
  background: url(${props => props.background});
  background-size: 100%;
`

const HeaderDiv = styled.div`


`;

export {
  BirdPageDiv,
  AddBirdButton,
  CardHolderDiv,
  CardDiv,
  ImgDiv
}
