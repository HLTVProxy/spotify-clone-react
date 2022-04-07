import React from 'react';
import { Layout } from 'antd';
import StyledContent from '../../common/Content';
import CardList from '../../common/CardList';

function Home() {
  return (
    <>
      <CardList title="最近播放" type="tracks" detailHref="/genre/recent-play" />
      <CardList title="官方播放清單" type="playlists" detailHref="/genre/official-playlists" />
      <CardList title="猜你喜歡" detailHref="/genre/recommendation"/>
    </>
  );
}

export default Home;
