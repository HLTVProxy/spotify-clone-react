import React from 'react';
import InfoHeader from '../../common/InfoHeader';
import ActionBar from '../../common/ActionBar';
import SongList from '../../common/SongList';

function PlayList() {
  return (
    <>
      <InfoHeader detail={true} />
      <ActionBar />
      <SongList />
    </>
  );
}

export default PlayList;
