import React from 'react';
import InfoHeader from '../../common/InfoHeader';
import CardList from '../../common/CardList'
import SongList from '../../common/SongList';

function User() {
  return (
    <>
      <InfoHeader type="user" description={false} />
      <CardList title='本月最熱門藝人' type="artist"/>
      <SongList title='本月最熱門曲目' />
      <CardList title='粉絲' type="fans"/>
      <CardList title='正在關注' type="follow"/>
    </>
  );
}

export default User;
