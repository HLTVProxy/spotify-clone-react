import React from 'react';
import InfoHeader from '../../common/InfoHeader';
import HotTrackList from '../../common/HotTrackList';
import CardList from '../../common/CardList';

function Artist() {
  return (
    <>
      <InfoHeader type="artist" />
      <HotTrackList />
      <CardList title="專輯" type="albums" />
      <CardList title="單曲和迷你專輯" type="singles" />
      <CardList title="粉絲也喜歡" type="artist" />
    </>
  );
}

export default Artist;
