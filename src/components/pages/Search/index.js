import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from 'antd';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import GenreList from '../../common/GenreList';
import SearchResult from '../../common/SearchResult'

function Search() {
  // let params = useParams();
  const [search, setSearch] = useState('');
  const [url, setUrl] = useState(window.location.href);

  // useEffect(() => {
  //   window.history.pushState('', '', `${url}/${search}`);
  // }, [search]);

  const handleSearch = (text) => {
    setSearch(text);
  };

  return (
    <>
      <SearchBar
        placeholder="藝人、歌曲"
        prefix={<SearchOutlined />}
        allowClear
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        value={search}
      />
      {search !== '' ? <SearchResult searchText={search} /> : <GenreList />}
    </>
  );
}

export default Search;

const SearchBar = styled(Input)`
  max-width: 992px;
  border-radius: 500px;
  margin-top: 32px;
  @media (max-width: 576px) {
    max-width: 100%;
  }
`;
