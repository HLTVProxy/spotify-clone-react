import React from 'react';
import CardList from '../CardList';

function SearchResult({ searchText }) {
  return (
    <>
      <CardList title="藝人" detailHref={`/search/${searchText}/artists`} />
      <CardList title="歌曲" detailHref={`/search/${searchText}/tracks`} />
    </>
  );
}

export default SearchResult;
