import React from 'react';
import { useParams } from 'react-router-dom';
import SongList from '../../common/SongList';

function Tracks() {
  let params = useParams();
  return (
    <div>
      <SongList detail={false} />
    </div>
  );
}

export default Tracks;
