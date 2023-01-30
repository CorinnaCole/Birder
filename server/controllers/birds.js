const axios = require('axios');
require("dotenv").config();
const parseString = require('xml2js').parseString;
const {
  getBirds,
  createABird,
  createBirdSighting,
  getAllBirdCardInfo
} = require('../../database/models/Birds.js');

const getBirdNames = (req, res) => {
  console.log('REQUEST RECEIVED');
  getBirds().then((names) => {
    res.send(names);
  })
}

const getBirdCards = (req, res) => {
  const userId = parseInt(req.params.user_id);
  getAllBirdCardInfo(userId)
  .then((data) => {
    let results = [];
    if (data.rows[0]) {
      results = data.rows[0].birdcardinfo
    }
    res.status(200).send(results);
  })
  .catch(err => {
    console.log('ERROR IN GETBIRDCARDS ', err);
  })
}


const getGeoLocFromAddress = async (req, res) => {
  let addressString = req.body.address.split(' ').join('%20');
  let googleURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Cgeometry&input=${addressString}&inputtype=textquery&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    let response = await axios.get(googleURL);
    let formattedAddress = response.data.candidates;
    res.send(formattedAddress);
  } catch (err) {
    console.log('there is an error in getGeoLocfromAddress', err);
    res.status(404);
  }
};

const getScientificName = async (nameAttempt) => {
  let taxinomicUrl = `http://www.itis.gov/ITISWebService/services/ITISService/searchForAnyMatch`;
  const response = await axios.get(taxinomicUrl, {
    params: {
      srchKey: nameAttempt
    }
  });
  return new Promise((resolve, reject) => {
    const nameResults = {};
    parseString(response.data, function (err, parsedResult) {
      const indexOfMostRelevantEntry = 1;
      const indexOfFallBackEntry = 0;
      const results = parsedResult['ns:searchForAnyMatchResponse']['ns:return'][0];
      const RESULT_SET_KEY = 'ax21:anyMatchList';
      if (results[RESULT_SET_KEY]) {

        const animalData = results[RESULT_SET_KEY][indexOfMostRelevantEntry] || results[RESULT_SET_KEY][indexOfFallBackEntry];
        nameResults.sciName = animalData['ax21:sciName'][0]
        nameResults.commonName = animalData['ax21:commonNameList'][0]["ax21:commonNames"][0]['ax21:commonName'][0]
        resolve(nameResults);
      } else {
        reject('no results found')
      }
    });
  })
}

const getWikiSummary = async (scientificName) => {
  let queryName = scientificName.split(' ').join('_');
  const summary = await axios({
    method: 'get',
    url: `https://en.wikipedia.org/api/rest_v1/page/summary/${queryName}`
  })
  return summary.data.extract;
}

const postBird = async (req, res) => {
  let bodyName = req.body.commonName;
  const lat = req.body.location.lat || null;
  const lng = req.body.location.lng || null;
  const note = req.body.note; // user notes
  const dateSeen = req.body.dateSeen;
  const userId = req.body.user_id;
  // const url = req.body.url;
  const birdObj = {
    notes: note,
    dateSeen: dateSeen,
    // url: url,
    user_id: userId,
    lat: lat,
    lon: lng
  };
  try {
    if (req.body.bird_id === 0) {
      const { sciName } = await getScientificName(bodyName);
      const summary = await getWikiSummary(sciName);
      birdObj.sciName = sciName;
      birdObj.summary = summary;
      birdObj.commonName = bodyName;
      const birdId = await createABird(birdObj);
      birdObj.bird_id = birdId.rows[0].bird_id;
    } else {
      birdObj.bird_id = req.body.bird_id;
    }
    await createBirdSighting(birdObj)
    res.sendStatus(200)
  } catch (err) {
    console.log('error posting bird', err);
    res.status(500).send(err);
  }
}

module.exports = {
  getBirdNames,
  postBird,
  getGeoLocFromAddress,
  getBirdCards
}

