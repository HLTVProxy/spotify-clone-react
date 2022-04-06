import React from 'react';
import { useParams } from 'react-router-dom';
import CardList from '../../common/CardList';

function Artists() {
  let params = useParams();
  return (
    <CardList title={`「${params.searchText}」的所有藝人`} detail={false} />
  );
}

export default Artists;
