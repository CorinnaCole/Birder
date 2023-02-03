import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../assets/BirdList.css';
import BirdCard from './BirdCard.jsx';
import BirdDetail from './BirdDetail.jsx';
import NewBirdForm from './NewBirdForm.jsx';
import {
  BirdPageDiv,
  AddBirdButton,
  CardHolderDiv
} from '../styled/StyledBirdComponents.jsx';



const BirdList = ({ userID, friend, back, allBirds }) => {
  const [addingBird, setAddingBird] = useState(false);
  const [currUser, setCurrUser] = useState(false);
  const [cardRows, setCardRows] = useState([]);
  const [cardView, setCardView] = useState(false);
  const [cardsBird, setCardsBird] = useState({});
  const [birds, setBirds] = useState([]);
  const [alpBirds, setAlpBirds] = useState([]);
  const [recBirds, setRecBirds] = useState([]);
  const [sort, setSort] = useState(true);
  const history = useHistory();


  const getBirdInfo = () => {
    let id = userID;
    if (typeof friend === 'object' && Object.keys(friend).length > 0) {
      id = friend.friend_user_id;
    }

    axios.get(`/birdcards/${id}`)
      .then((data) => {
        let copy1 = data.data.slice();
        let copy2 = data.data.slice();
        let sorted = copy1.sort(function compareFn(a, b) {
          if (a.common_name.toUpperCase() < b.common_name.toUpperCase()) {
            return -1;
          }
          if (a.common_name.toUpperCase() < b.common_name.toUpperCase()) {
            return 1;
          }
          return 0;
        });
        let sortedRec = copy2.sort(function compareFn(a, b) {
          if (a.first_seen > b.first_seen) {
            return -1;
          }
          if (a.first_seen < b.first_seen) {
            return 1;
          }
          return 0;
        });
        setRecBirds(sortedRec);
        setAlpBirds(sorted);
        setBirds(data.data);
      })
      .catch((err) => {
        console.log('error getting bird cards info', err);
      });
  };


  useEffect(() => {
    getBirdInfo();
    if (!(typeof friend === 'object' && Object.keys(friend).length > 0)) {
      setCurrUser(true);
    }
  }, [userID]);// ?

  const nowAddingBird = () => {
    setAddingBird(!addingBird);
  };

  const cardClicked = (card) => {
    card = card || {};
    setCardsBird(card);
    setCardView(!cardView);
  };

  const sortChange = () => {
    setSort(!sort);
    if (sort) {
      setBirds(alpBirds);
    } else {
      setBirds(recBirds);
    }
  };

  return (
    <BirdPageDiv>
      {currUser && <AddBirdButton onClick={nowAddingBird}>Add Bird Sighting</AddBirdButton>}
      <br />
      {sort && <button onClick={sortChange}>Alphabetical</button>}
      {!sort && <button onClick={sortChange}>Most Recent</button>}
      <br />
      <h3>Your Birds:</h3>
      {!cardView && (
        <CardHolderDiv>
          {
            (birds.length > 0) && birds.map((bird, i) => {
              return (
                <BirdCard key={i} clicked={(bird) => { cardClicked(bird); }} bird={birds[i]} />
              )
            })
          }
        </CardHolderDiv>)
      }
      {addingBird && <NewBirdForm close={() => { setAddingBird(); }} allBirds={allBirds} userID={userID} birdCards={birds}
        update={() => { getBirdInfo() }} />}
      {cardView && <BirdDetail bird={cardsBird} back={() => { cardClicked() }} userID={userID} />}
    </BirdPageDiv>
  );
};

export default BirdList;
