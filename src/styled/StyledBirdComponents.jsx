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
`;

const HeaderDiv = styled.div`
height: auto;
padding-left: 40px;
line-height: 1em;
`;

const BirdDetailBackground = styled.div`{
  width: 100%;
  height: 100%;
  background-color: #D3D3D3;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}`;

const BirdDetailDiv = styled.div`
  width: 90vw;
  max-width: 1577px;
  height: 95vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid red;
  border-radius: 10px;
  background-color: white;
  display: grid;
  grid-template-columns: 5% 2fr 2fr 1fr 2fr 2fr 5%;
  grid-template-rows: 5% repeat(8, 1fr) 5%;
  `;

  const BirdDetailHeader = styled.div`
  grid-area: 1/ 1 / 1 / 8;
  background-color: #32690f;
  color: white;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1% 0 5%;
  font-size: x-large;
  font-weight: 600
`;

const DescriptionDiv = styled.div`
    grid-area: 2 / 2 / 6 / 7;
    border: 2px solid #213547;
    padding: 2rem;
  `;
const BirdSummary = styled.div`


`;



const PicsAndNotes = styled.div`

`;

export {
  BirdPageDiv,
  AddBirdButton,
  CardHolderDiv,
  CardDiv,
  ImgDiv,
  HeaderDiv,
  BirdDetailDiv,
  BirdDetailHeader,
  BirdDetailBackground,
  DescriptionDiv
}
