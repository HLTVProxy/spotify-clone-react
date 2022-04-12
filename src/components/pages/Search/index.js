import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from 'antd';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import GenreList from '../../common/GenreList';
import SearchResult from '../../common/SearchResult';
import apiClient from '../../../spotify';

function Search() {
  // let params = useParams();
  const [search, setSearch] = useState('');
  const [resultData, setResultData] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [url, setUrl] = useState(window.location.href);

  useEffect(() => {
    // window.history.pushState('', '', `${url}/${search}`);
    if (search) {
      apiClient
        .get(`search?q=${search}&type=track,artist&limit=8`)
        .then((res) => {
          let resultArtists = res.data.artists.items.map((artist) => {
            return {
              id: artist.id,
              uri: artist.uri,
              title: artist.name,
              descriptions: '藝人',
              coverUrl: artist.images[0]?.url,
            };
          }); 
          let resultTracks = res.data.tracks.items.map((track) => {
            return {
              id: track.id,
              uri: track.uri,
              title: track.name,
              artistIDs: track.album.artists.map((artist) => {
                return artist.id;
              }),
              artistNames: track.album.artists.map((artist) => {
                return artist.name;
              }),
              coverUrl: track.album.images[0]?.url,
            };
          });
          setResultData({artists: resultArtists, tracks: resultTracks});
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      apiClient
        .get(`browse/categories?country=TW&limit=50`)
        .then((res) => {
          let categoriesArr = res.data.categories.items.map((category) => {
            return {
              id: category.id,
              name: category.name,
              img: category.icons[0]?.url
            };
          })
          setGenresList(categoriesArr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [search]);

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
      {search !== '' ? (
        <SearchResult searchText={search}>{resultData}</SearchResult>
      ) : (
        <GenreList>{genresList}</GenreList>
      )}
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
