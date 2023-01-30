const { pool } = require('../db.js');

const getAllBirdCardInfo = (user_id) => {
  const params = [user_id];
  return pool.query(
    `with birdsArray AS (
      SELECT array_agg(bird_id) AS arr FROM bird_user WHERE user_id = $1
    ) SELECT array_agg(
      json_build_object (
        'user_id', $1,
        'bird_id', birds.bird_id,
        'common_name',birds.bird_common_name,
        'scentific_name',birds.scentific_name,
        'summary', birds.summary,
        'count', (SELECT COUNT(*) FROM bird_photos WHERE bird_photos.bird_id= birds.bird_id ),
        'bird_photos', (SELECT json_agg(bird_photos.photo_url) FROM bird_photos WHERE bird_photos.bird_id = birds.bird_id),
        'sighting_notes', (SELECT json_agg(bird_photos.note) FRoM bird_photos WHERE bird_photos.bird_id= birds.bird_id),
        'bird_location', (SELECT json_agg(
          json_build_object(
            'lat', bird_photos.location_lat,
            'lng', bird_photos.location_lon
          )) FROM bird_photos WHERE bird_photos.bird_id = birds.bird_id)
      )
    ) AS birdCardInfo
    FROM birds
    WHERE birds.bird_id = ANY (SELECT unnest(arr) FROM birdsArray);`, params
  )
}


const getBirds = () => {
  return pool.connect()
    .then(client => {
      return client.query('SELECT * FROM birds')
      .then((res) => {
        client.release();
        return res.rows;
      })
      .catch((err) => {
        client.release();
        console.log('getBirds FROM DB ERROR ', err);
      });
  })
  .catch((err) => console.log('getBirds FROM DB ERROR ', err));
}

const createABird = (birdObj) => {
  const params = [birdObj.commonName, birdObj.sciName, birdObj.summary];
  return pool.query(`
    INSERT INTO birds (bird_common_name, scentific_name, summary)
    VALUES ($1, $2, $3)
    ON CONFLICT ON CONSTRAINT unique_sci_name DO UPDATE SET scentific_name=EXCLUDED.scentific_name
    RETURNING bird_id
  `, params)
};

const createBirdSighting = (birdObj) => {
  const params = [birdObj.bird_id, birdObj.user_id, birdObj.lat, birdObj.lon, birdObj.notes];

  return pool.query(`
    WITH insertBU AS (
      INSERT INTO bird_user(bird_id, user_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_bird_id_user_id DO UPDATE SET bird_id=EXCLUDED.bird_id
      RETURNING b_u_id AS b_u_id
    )
    INSERT INTO bird_photos(bird_user_id, bird_id, location_lat, location_lon, note, date)
    VALUES ((select b_u_id FROM insertBU), $1, $3, $4, $5, NOW())
  `, params)
};


module.exports = {
  getBirds,
  createABird,
  createBirdSighting,
  getAllBirdCardInfo
}

