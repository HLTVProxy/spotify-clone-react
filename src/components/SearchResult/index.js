import React from 'react';
import CardList from '../CardList';

function SearchResult({ searchText, children }) {
  return (
    <>
      <CardList type="artists" title="藝人" detailHref={`/search/${searchText}/artists`}>{children.artists}</CardList>
      <CardList type="tracks" title="歌曲" detailHref={`/search/${searchText}/tracks`}>{children.tracks}</CardList>
    </>
  );
}

export default SearchResult;
