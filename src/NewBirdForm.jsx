
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const ModalBackground = styled.div`{
  width: 100%;
  height: 100%;
  background-color: #2d5d7b;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 1;
}`;

const ModalContainer = styled.div`{
  button {
    border:none;
  }
  .upload {
    border:solid;
  }
  width: 500px;
  height: 500px;
  border:solid;
  border-radius: 25px;
  background-color: #686868;
  box-shadow: 5px 5px 10px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  font-size: 24px;

}`;

const DropDownDiv = styled.div`
{
  border:solid;
  cursor: pointer;
}
`

const NewBirdForm = ({ close, allBirds, userID, birdCards, update }) => {
  const [note, setNote] = useState('');
  const [dateSeen, setDateSeen] = useState('');
  const [suggestedBirds, setSuggestedBirds] = useState([]);
  const [typeAddress, setTypeAddress] = useState(false);
  const [address, setAddress] = useState({});
  const [zip, setZip] = useState('');
  const [street, setStreet] = useState('');
  const [state, setState] = useState('');
  const [place, setPlace] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [addressOptions, setAddressOptions] = useState([]);
  const [locationObj, setLocationObj] = useState({});
  const [addressValReturned, setAddressValReturned] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [birdSugClicked, setBirdSugClicked] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [birlURL, setBirdURL] = useState('');
  const [birdName, setBirdName] = useState('');
  const [typedBirdName, setTypedBirdName] = useState('');
  const [selectedImage, setSelectedImage] = useState([]);

  useEffect(() => {
    if (Array.isArray(birdCards)) {
      setCardList(birdCards)
    };

  }, [birdCards])

  useEffect(() => {
    const birdOptions = allBirds.map(bird => {
      const newBird = Object.assign({}, bird);
      console.log(newBird)
      newBird.label = bird.bird_common_name;
      return newBird;
    })
    setSuggestedBirds(birdOptions);
    console.log(birdOptions);

  }, [])

  const onNote = (e) => {
    setNote(e.target.value);
  };

  const onDateSeen = (e) => {
    setDateSeen(e.target.value);
  };

  const onPlaceName = (e) => {
    setPlaceName(e.target.value);
  };

  const onZip = (e) => {
    setZip(e.target.value);
  };

  const onPlace = (e) => {
    setPlace(e.target.value);
  };

  const onStreet = (e) => {
    setStreet(e.target.value);
  };

  const onState = (e) => {
    setState(e.target.value);
  };

  const typeAddressIn = () => {
    setTypeAddress(!typeAddress);
  };

  const getAddressFromBrowser = () => {
    setWaiting(!waiting);
    console.log('waiting? ', waiting);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('location when clicked', position);
      setWaiting(false);
      setLocationObj({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }

  const checkAddress = () => {
    // setWaiting(!waiting);
    const addressString = place + street + ' ' + state + ' ' + zip;
    axios.post('/location', {
      address: addressString
    })
      .then(results => {
        const options = results.data;
        setAddressOptions(options);
        setAddressValReturned(true);
        // setWaiting(!waiting);
      })
      .catch(err => {
        const noAddresses = { formatted_address: "No results: please try a different address" }
        setAddressOptions([noAddresses]);
        setAddressValReturned(true);
      })
    // not really sure about the lines below so leaving them for now.
    setZip('');
    setStreet('');
    setState('');
    setPlace('');
  };

  const selectAddress = (index) => {
    let latLong = addressOptions[index].geometry.location;
    setLocationObj(latLong);
    setAddressValReturned(false);
  };

  const handleTypingBirdName = (event, newInputValue) => {
    if (newInputValue !== "undefined") {
      console.log('cj', newInputValue)
      setTypedBirdName(newInputValue);
    }
  }

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0])
    console.log(e.target.files[0], selectedImage)
  }

  const getBirdUrl = async (picture) => {
    const formData = new FormData()
    formData.append('image', selectedImage);
    formData.append('upload_preset', 'eocwrax6')

    console.log('sel image', selectedimage)
    const postImage = async () => {
      try {
        const response = await axios.post('/image-upload', {
          image: formData
        },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
        )
        console.log(response.data)
        // setImageData(response.data)
      }
      catch (error) {
        console.error(error)
      }
    }
    postImage()


    // try {
    // console.log(selectedImage, ' <selectedimage')
    //   let response = await axios.post('/image-upload', {
    //     image: picture
    //   })
    //   setBirdURL(response);
    // console.log(response);
    // } catch (err) {
    // console.log('there is an error in posting to cloudinary')
    // }
  };


  const submitForm = (event) => {
    event.preventDefault();
    const foundBird = suggestedBirds.find(bird => bird.bird_common_name === typedBirdName)
    const birdInfo = {
      commonName: foundBird ? foundBird.bird_common_name : typedBirdName,
      note: note,
      dateSeen: dateSeen,
      user_id: userID,
      bird_id: foundBird ? foundBird.bird_id : 0,
      location: locationObj,
      // photo: birdURL
    };

    console.log('birdInfo >', birdInfo)
    getBirdUrl(selectedImage);
    axios.post('/birds', birdInfo)
    .then((data) => {
    console.log('bird post data: ', data);
      update();
      close();
    })
    .catch((err) => {
    console.log('error posting bird sighting: ', err);
    });
  };

  // testing - try using for other values
  // const setFormDetails = (event, key, value) => {
  //   form[key] = value;
  //   setForm(form)
  // }
  return (
    <ModalBackground>
      <ModalContainer>
        <button
          onClick={() => { close(); }}>
          CLOSE
        </button>
        <br />
        <br />
        <form>
          <Stack
            sx={{ width: '500px' }} >
            <Autocomplete
              freeSolo
              id="multiple-limit-tags"
              getOptionLabel={(suggestedBirds) => `${suggestedBirds.label}`}
              options={suggestedBirds}
              sx={{ width: '300px' }}
              inputValue={typedBirdName}
              onInputChange={handleTypingBirdName}
              renderOption={(props, suggestedBirds) => (
                <Box component="li" {...props} key={suggestedBirds.bird_id}>
                  {suggestedBirds.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ex: cardinal"
                  InputProps={{ ...params.InputProps, type: 'text' }}
                />
              )}
            />
          </Stack>
          <label>Personal Note</label>
          <input type="textarea"
            placeholder="a place to jot down your thoughts on this or future birdsightings"
          //   onChange={(event) => {
          //     setFormDetails(event, 'note', event.target.value)
          //   }
          // }
          />
          <br />
          <br />
          <label>Date Seen</label>
          <input type="date" onChange={onDateSeen} />
          <br />
          <br />
          <button className="bird-right" type="button" onClick={getAddressFromBrowser}>grab location</button>
          <button className="bird-left" onClick={typeAddressIn} type="button">fill out location or zip</button>
          {typeAddress && (
            <div>
              {/* address form to get here once I have better idea of how many states */}
              <label>zip code</label>
              <input type="text" placeholder="ex. 12345" onChange={onZip} />
              <br />
              OR
              <br />
              <label>Place</label>
              <input type="text" placeholder="ex. Central Park" onChange={onPlace} />
              <br />
              OR
              <br />
              <label>Street Address</label>
              <input type="text" placeholder="ex. 123 main st" onChange={onStreet} />
              <br />
              <label>State initials?</label>
              <input type="text" placeholder="ex. VA" onChange={onState} />
              <br />
              {
                addressValReturned &&
                addressOptions.map((option, index) => {
                  return (
                    <DropDownDiv
                      key={index}
                      index={index}
                      onClick={() => { selectAddress(index) }}>
                      {option.formatted_address}
                    </DropDownDiv>
                  );
                })
              }
              <button type="button" onClick={checkAddress}>check address</button>

            </div>
          )}
          <br />
          <br />
          <label>Select a Photo of the Bird Seen!</label>
          <input type="file" onChange={handleFileChange} />
          <br />
          {/*use birdURL and setBirdURL to store url in state, once set i'd check with Andy for what all needs to happen along the req chain starting with variable passed from here*/}
          <br />
          {(!waiting) && <button type="submit" onClick={submitForm}>Submit</button>}
          {waiting && <div>Waiting on Location Grab</div>}
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default NewBirdForm;
