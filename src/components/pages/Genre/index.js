import React from 'react';
import { useParams } from 'react-router-dom';
import CardList from '../../common/CardList';

function Genre() {
  let params = useParams();
  return (
    <>
      <CardList title={params.name} detail={false} />
    </>
  );
}

export default Genre;
