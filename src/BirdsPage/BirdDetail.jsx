import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Card from '@mui/material/Card';
import CloseIcon from '@mui/icons-material/Close';
import Map from '../Map.jsx';
import birdphotos from './planz.jsx';
import {
  BirdDetailDiv,
  BirdDetailHeader,
  BirdDetailBackground,
  DescriptionDiv
} from '../styled/StyledBirdComponents.jsx';



const SectionImage = styled.img`
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  width: calc(100% + 1.5rem);
  height: 214px;
  object-fit: contain;
`;


const Decription = styled.p`
  font-size: 14px;
  color: #7f8c9b;
  line-height: 150%;
  color: black;
 `;

const BirdDetail = ({ bird, back }) => {

  useEffect(() => {
    console.log(bird, 'here is the bird');

  }, [])

  return (
    <BirdDetailBackground>
      <BirdDetailDiv>
        <BirdDetailHeader>
          {bird.common_name}: {bird.scentific_name}
          <CloseIcon
            onClick={() => {back()}}
            sx={{
              color: "white",
              fontSize: 40,
              cursor: "pointer"
            }}
          />
        </BirdDetailHeader>
        <DescriptionDiv>
          <SectionImage
            src={birdphotos[bird.bird_id - 1] || bird.bird_photos[0]}
            alt="header image"
            height="400"
            width="384"
          />
          <aside>

            <h2>{bird.scentific_name}</h2>

            <div>Times seen: {bird.count}</div>
            <h3>Decription</h3>
            <Decription>
              {bird.summary}
            </Decription>
            <h3>Personal Notes</h3>
            <Decription>{bird.sighting_notes[0]}</Decription>
          </aside>
          <aside>
            <h3 >Sighting Locations</h3>
            <Map birdArrayLocations={bird.bird_location} />
          </aside>
        </DescriptionDiv>
      </BirdDetailDiv>
    </BirdDetailBackground>
  );
};
export default BirdDetail;
