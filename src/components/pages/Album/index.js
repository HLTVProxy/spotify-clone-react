import React from 'react';
import InfoHeader from '../../common/InfoHeader';
import ActionBar from '../../common/ActionBar';
import SongList from '../../common/SongList';
import CardList from '../../common/CardList';

function Album() {
  return (
    <>
      <InfoHeader type="album" description={false} detail={true} />
      <ActionBar />
      <SongList />
      <CardList title={`更多來自 任然 的內容`} type="album" detailText="查看音樂作品" />
    </>
  );
}

export default Album;
