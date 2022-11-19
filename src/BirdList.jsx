import React from 'react';
import BirdBinderEntry from './BirdBinderEntry.jsx';

const BirdList = (props) => {
  return (
    <div>
      <h1>Bird Collection</h1>
      <button>Add Bird Sighting</button>
      {[1,1,1].map((bird, i) => {
        return <BirdBinderEntry key={i} />
      })}

    <form>
      <label>Birds Common Name</label>
      <input type="text" placeholder="ex. cardinal" />
      <label>Personal Note</label>
      <input type="textarea" placeholder="a place to jot down your thoughts on this or future birdsightings"/>
      <label>Date Scene</label>
      <input type="date"/>
      {/* date from calendar input?
      photo from cloudinary?
      location? */}
      <button>Submit</button>
    </form>
    </div>
  )
}

export default BirdList;

// import BirdList from './BirdList.jsx';//remove whole line

{/* <BirdList></BirdList>//remove whole line */}