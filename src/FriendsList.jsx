import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './assets/FriendList.css';
import FriendEntry from './FriendEntry.jsx';
import BirdList from './BirdList.jsx';
import Chat from './Chat.jsx';

const FriendsList = ({userID, allUsers, friendsList, updateFriends, globalUser}) => {
  const [friendSearch, setFriendSearch] = useState('');
  const [suggestions, setSuggestions] = useState(false);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [birdsView, setBirdsView] = useState(false);
  const [chatView, setChatView] = useState(false);
  const [clickedFriend, setClickedFriend] = useState({});
  const [listState, setListState] = useState([]);
  const sample = ['name1', 'name2', 'name3'];
  const history = useHistory();



  useEffect(() => {
    if (Array.isArray(friendsList)) {
      setListState(friendsList);
    }
  }, [friendsList]);

  const onFriendSearch = (e) => {
    setFriendSearch(e.target.value);
  };

  const onSuggestions = () => {
    setSuggestions(!suggestions);
    setSuggestedFriends(allUsers);
  };

  const onBirdClick = (friend) => {
    friend = friend || {};
    setClickedFriend(friend);
    setBirdsView(!birdsView);
  };

  const onChatClicked = (friend) => {
    friend = friend || {};
    setClickedFriend(friend);
    setChatView(!chatView);
  };

  const onSuggestedFriend = (friend) => {
    // console.log(friend);
    const friendInfo = {
      userID: userID,
      friend: friend.user_id
    }
    axios.post('/friends', friendInfo)
      .then((data) => {
        updateFriends();
        setSuggestions(false);
      })
      .catch((err) => {
        console.log('error adding friend: ', err);
      });
  };

  useEffect(() => {
    if (friendSearch.length !== 0) {
      setSuggestions(true);
      const filtered = allUsers.filter((friend) => {
        return (`${friend.first_name} ${friend.last_name}`).toUpperCase().includes(friendSearch.toUpperCase()) && !(listState.some((element) => { return friend.user_id === element.friend_user_id}));
      });
      setSuggestedFriends(filtered);
    } else {
      setSuggestions(false);
    }
  }, [friendSearch]);

  return (
    <div>
      {(!birdsView && !chatView) && (
      <div>
        <button onClick={() => {history.push('/user')}}>Return Home</button>
        <div>
          {/* <button onClick={onSuggestions}>See Suggested Friends</button> */}
          <div className="friends-dropdown">
            <input  className="friend-search" type="text" placeholder="Find Fellow Birders" onChange={onFriendSearch} />
            {suggestions && (
              <div className="friends-suggestions">
                  {suggestedFriends.map((friend, i) => {
                    return (<div key={i} onClick={() => { onSuggestedFriend(friend) }} className="friend-entry">{`${friend.first_name} ${friend.last_name}`}</div>);
                  })}
            </div>)}
          </div>
        </div>
        <h1>Your Friends</h1>
        {listState.map((friend, i) => {
          return (<FriendEntry key={i} friend={friend} chatClicked={(friend) => {onChatClicked(friend)}}
            birdClicked={(friend) => { onBirdClick(friend); }} />);
        })}
      </div>
      )}
      {birdsView && <BirdList friend={clickedFriend} back={() => {onBirdClick()}} userID={userID} />}
      {chatView && <Chat friend={clickedFriend} userID={userID} back={() => {onChatClicked()}} allUsers={allUsers} globalUser={globalUser}/>}

    </div>
  );
};

export default FriendsList;

