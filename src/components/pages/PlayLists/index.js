import React from 'react';
import { Layout } from 'antd';
import StyledContent from '../../common/Content';
import CardList from '../../common/CardList';

function PlayLists() {
  return (
    <StyledContent>
      <CardList title="播放清單" type='playlist' detail={false} />
    </StyledContent>
  );
}

export default PlayLists;
