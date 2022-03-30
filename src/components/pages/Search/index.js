import { useState, useEffect } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
function Search() {
  const [search, setSearch] = useState('');
  const [url, setUrl] = useState(window.location.href);

  useEffect(() => {
    window.history.pushState('', '', `${url}/${search}`);
  }, [search]);

  const handleSearch = (text) => {
    setSearch(text);
  };

  return (
    <SearchBar
      placeholder="藝人、歌曲或 Podcast"
      prefix={<SearchOutlined />}
      allowClear
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
}

export default Search;

const SearchBar = styled(Input)`
  width: 30%;
  border-radius: 500px;
  margin-top: 32px;
`;
