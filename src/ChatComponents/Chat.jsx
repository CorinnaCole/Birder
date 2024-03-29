import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import ChatUsers from './ChatUsers.jsx';
import ChatWelcomeScreen from './ChatWelcomeScreen.jsx';
import ChatContainer from './ChatContainer.jsx';


function Chat ({clickedFriend, userID, globalUser, back}) {
  const socket = useRef;
  let host = `http://localhost:3001`;
  const [friends, setFriends] = useState([]);
  const [friendSelected, setFriendSelected] = useState(undefined);
  const [chatMessages, setChatMessages] = useState(undefined);
  const [conversationId, setConversationId] = useState(undefined);
  const [chatId, setChatId] = useState(undefined);
  const history = useHistory();

  const setChat = function (user) {
    setFriendSelected(user);
    let chatIdArray = [user.friend_user_id, userID].sort((a, b) => a - b);
    setChatId(`${chatIdArray[0]}&${chatIdArray[1]}`)
    let chatIdString = `${chatIdArray[0]}&${chatIdArray[1]}`;
    axios.get(`/chatId/${chatIdString}`)
    .then((response) => {
      setChatMessages(response.data);
    })
  };

  const displayMessages = function () {
    let chatIdArray = [friendSelected.friend_user_id, userID].sort((a, b) => a - b);
    let chatIdString = `${chatIdArray[0]}&${chatIdArray[1]}`;

    axios.get(`/chatId/${chatIdString}`)
      .then((response) => {
        setChatMessages(response.data);
      })
  };

  useEffect(() => {
    axios.get(`friendsList/${userID}`)
      .then((response) => {
        setFriends(response.data);
      })
  },[friendSelected])

  useEffect(() =>{
    if(userID) {
      socket.current = io(host);
      socket.current.emit('add-user', userID)
    }
  }, [userID]);

  return (
    <>
    <div style={{display:'flex', alignItems:'center', justifyContent:'end'}}>
    <button style={{margin: '1em'}}onClick={() => history.push('/user')}>Home</button>
    <button onClick={back}>back</button>
    </div>
  <OuterContainer>
    <div className="innerContainer">
    <img style={{position: "absolute", height: "5em"}} src='https://i.pinimg.com/originals/7e/58/c4/7e58c42bd5c6bbe05a1d49ee9737f909.gif' alt="logo" />
    <ChatUsers friends={friends} userID={userID} globalUser={globalUser} setChat={setChat} />
    {friendSelected !== undefined ? <ChatContainer friendSelected={friendSelected} setFriendSelected={setFriendSelected} chatMessages={chatMessages} setChatMessages={setChatMessages} globalUser={globalUser} userID={userID} displayMessages={displayMessages} chatId={chatId} socket={socket} /> : <ChatWelcomeScreen />}
    </div>
  </OuterContainer>
  </>
  );
};

const OuterContainer = styled.div`
margin: 50px;
height: 68vh;
width: 68vw;
display: flex;
flex-direction: column;
justify-content: center;
// gap: 1rem;
align-items: center;
background-color: #467693;
.innerContainer {
  height: 65vh;
  width: 65vw;
  display: grid;
  background-color: #2D5D7B;
  grid-template-columns: 25% 75%;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}
`

export default Chat;