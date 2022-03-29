import React from 'react';
import { Layout } from 'antd';
import StyledContent from '../../common/Content'
import CardList from '../../common/CardList';


function Home() {
  return (
    <Layout>
      <StyledContent>
        <CardList title="最近播放" />
        <CardList title="官方播放清單" />
        <CardList title="猜你喜歡" />
      </StyledContent>
    </Layout>
  );
}

export default Home;


