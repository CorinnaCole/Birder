require('dotenv').config();
const axios = require('axios');
const {
  postUser,
  getEmail,
  getOneUser,
  updateOneUser,
  getOneUserID,
  getUsers,
  getFriends,
  postFriend
} = require('../../database/models/Users.js');

const getAllUsers = (req, res) => {
  getUsers()
    .then((response) => {
      res.send(response.rows);
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUserID = (req, res) => {
  getOneUserID(req.query)
    .then((response) => {
      res.send(response.rows);
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

const addUser = (req, res) => {
  postUser(req.body)
    .then((response) => {
      res.send(response);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.end('error in add user');
    });
};

const getUser = (req, res) => {
  getOneUser(req.query)
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateUser = (req, res) => {
  updateOneUser(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUserEmail = (req, res) => {
  getEmail(req.query)
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getFriendList = (req, res) => {
  getFriends(parseInt(req.params.user_id))
    .then((data) => {
      res.status(200).send(data.rows[0].friends);
    })
    .catch((err) => console.log('ERROR IN GETFRIENDLIST ', err));
};

const createNewUser = async (req, res) => {
  const zipCode = req.body.zip;
  try {
    getUserGeoLocFromZip(zipCode);
  } catch (err) {
    console.log(err, 'error in createNewUser');
  }
};

const getUserGeoLocFromZip = async (zip) => {
  const encodedZip = encodeURI(zip);
  const googleURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedZip}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    const fullLocationData = await axios.get(googleURL);
    const geoLocation = {};
    geoLocation.lat = fullLocationData.data.results[0].geometry.location.lat;
    geoLocation.lng = fullLocationData.data.results[0].geometry.location.lng;
  } catch (err) {
    console.log('error inside getUserGeoLocFromZip', err);
  }
};

const addFriend = (req, res) => {
  postFriend(req.body)
    .then((response) => {
      console.log(response);
      res.send('added friend');
    })
    .catch((err) => {
      console.log('error in add friend server controller: ', err);
    })
}

module.exports = {
  addUser, getUser, getUserEmail, updateUser, createNewUser, getUserID, getAllUsers,getFriendList, addFriend
};
