import React from 'react';
import { Layout } from 'antd';
import CardList from '../../common/CardList';

function PlayLists() {
  return <CardList title="播放清單" type="playlist" detail={false} />;
}

export default PlayLists;
