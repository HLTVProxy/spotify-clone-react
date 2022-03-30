import React from 'react';
import CollectionTabs from '../CollectionTabs';
import CardList from '../../../common/CardList';

function Artists() {
  return (
    <>
      <CollectionTabs />
      <CardList title="藝人" type="artist" detail={false} />
    </>
  );
}

export default Artists;
