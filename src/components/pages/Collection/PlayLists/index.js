import React from 'react';
import CollectionTabs from '../CollectionTabs';
import CardList from '../../../common/CardList';

function PlayLists() {
  return (
    <>
      <CollectionTabs />
      <CardList title="播放清單" type="playlist" detail={false} />
    </>
  );
}

export default PlayLists;
