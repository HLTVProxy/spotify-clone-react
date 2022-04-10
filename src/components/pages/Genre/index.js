import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardList from '../../common/CardList';
import apiClient from '../../../spotify';

function Genre() {
  let params = useParams();
  let defaultArr = [
    {
      id: 'recent-play',
      name: '最近播放',
      fetchUrl: 'me/player/recently-played?limit=50',
    },
    {
      id: 'official-playlists',
      name: '官方播放清單',
      fetchUrl: 'browse/featured-playlists?country=TW&limit=50',
    },
    {
      id: 'recommendations',
      name: '猜你喜歡',
      fetchUrl: 'browse/featured-playlists?country=TW&limit=8',
    },
  ];
  let currentGenre = {};
  defaultArr.forEach((item) => {
    if (item.id === params.id) {
      currentGenre = item;
    }
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    switch (params.id) {
      case 'recent-play':
        fetchRecentlyPlayedTracks();
        break;
      case 'official-playlists':
        fetchOfficialPlaylists();
        break;
      default:
        break;
    }
    
  }, []);

  const fetchRecentlyPlayedTracks = () => {
    return apiClient
      .get(currentGenre.fetchUrl)
      .then((res) => {
        let recentlyPlayedTracksArr = res.data.items.map((item) => {
          return {
            id: item.track.id,
            uri: item.track.uri,
            title: item.track.name,
            artistIDs: item.track.artists.map((artist) => {
              return artist.id;
            }),
            artistNames: item.track.artists.map((artist) => {
              return artist.name;
            }),
            coverUrl: item.track.album.images[0].url,
          };
        });
        setData(recentlyPlayedTracksArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchOfficialPlaylists = () => {
    return apiClient
      .get(currentGenre.fetchUrl)
      .then((res) => {
        let officialPlaylistsArr = res.data.playlists.items.map((item) => {
          return {
            id: item.id,
            uri: item.uri,
            title: item.name,
            descriptions: item.description,
            coverUrl: item.images[0].url,
          };
        });
        setData(officialPlaylistsArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {data && (
        <CardList type={params.id === 'official-playlists' ? 'playlists' : 'tracks'} title={currentGenre.name} detail={false}>
          {data}
        </CardList>
      )}
    </>
  );
}

export default Genre;
