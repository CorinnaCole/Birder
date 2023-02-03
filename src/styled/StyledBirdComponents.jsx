import styled, { css } from 'styled-components';

const BirdPageDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  top: 280px;
  max-width: 1570px;
  padding: 15px;
`;

const CardHolderDiv = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

const AddBirdButton = styled.button`
  position: relative;
  top: -3%;
  width: 250px;
  margin: auto;
  border: 1px solid #D7942E;
  background-color: #953553;
  font-family: Manrope,Arial,sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 3em;
  color: #fff;
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
height: auto;
padding-left: 40px;
line-height: 1em;

`;

export {
  BirdPageDiv,
  AddBirdButton,
  CardHolderDiv,
  CardDiv,
  ImgDiv,
  HeaderDiv
}
