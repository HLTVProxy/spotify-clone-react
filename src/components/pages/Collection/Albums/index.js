import React from 'react';
import CollectionTabs from '../CollectionTabs';
import CardList from '../../../common/CardList';

function Albums() {
  return (
    <>
      <CollectionTabs />
      <CardList title="專輯" type="albums" detail={false} />
    </>
  );
}

export default Albums;
