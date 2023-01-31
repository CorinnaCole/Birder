import React from 'react';
import './assets/BirdList.css';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import birdphotos from './planz.jsx';

const BirdBinderEntry = ({bird, clicked}) => {
  const locations = ['The Park', 'Work', 'Friends House', 'The Bus Stop', 'The River', 'The Beach', 'The Lake House', 'The Cabbin in the Woods'];
  return (
    <div className="binder-entry" onClick={() => { clicked(bird); }}>
      <div className="binder-card">
        <aside>
          <h3>{bird.common_name}</h3>
          <img src={birdphotos[bird.bird_id - 1] || bird.bird_photos[0]} alt={`${bird.common_name}`} />
          <div className="binder-tag">{`Last Seen: ${bird.last_seen}` }</div>
          <div className="binder-tag">{`Spotted At: ${locations[Math.floor(Math.random() * locations.length)]}`} </div>
          <h3>Personal Notes</h3>
          <div className="binder-description">{(bird.sighting_notes || bird.notes) || (bird.summary || 'no personal notes or summary on file')}</div>
        </aside>
      </div>
    </div>
  );
};

export default BirdBinderEntry;
/* <Card onClick={() => { clicked(bird); }} sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {bird.common_name}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="140"
          image = {bird.bird_photos[0]}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Last Seen: ?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Spotted At: ?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            personal note or first 100 charaters of it.
          </Typography>
        </CardContent>
       <CardActions>

      </CardActions>
      </Card> */
