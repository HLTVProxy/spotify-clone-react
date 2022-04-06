import React from 'react';
import InfoHeader from '../../common/InfoHeader';
import SongList from '../../common/SongList';

function PlayList() {
  return (
    <>
      <InfoHeader detail={true} />
      <SongList />
    </>
  );
}

export default PlayList;
