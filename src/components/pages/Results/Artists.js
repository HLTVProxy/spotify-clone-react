import React from 'react';
import { useParams } from 'react-router-dom';
import CardList from '../../common/CardList';

function Artists() {
  let params = useParams();
  return (
    <>
      <h1>{`「${params.searchText}」的所有藝人`}</h1>
      <CardList detail={false} />
    </>
  );
}

export default Artists;
