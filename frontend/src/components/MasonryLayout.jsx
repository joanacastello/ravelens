import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';

const breakpointObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1000: 3,
    600: 2
}

const MasonryLayout = ({ pins }) => {
  return (
    <Masonry className='flex anumate-slide-fwd' breakpointCols={breakpointObj}>
        {pins?.map((pin) => (
            <Pin key={pin._id} pin={pin} className="w-max" />
        ))}
    </Masonry>
  )
}

export default MasonryLayout