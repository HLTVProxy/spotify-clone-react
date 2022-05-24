import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import CardList from '../../components/CardList';
import apiClient from '../../spotify';
import SeedContext from '../../contexts/TrackSeedContext';

function Genre() {
  let params = useParams();
  const { seed } = useContext(SeedContext);
  let tracksSeed = [];
  seed.forEach((item, idx) => {
    if (idx < 5) {
      tracksSeed.push(item.id);
    }
  });

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
      fetchUrl: `recommendations?limit=50&seed_tracks=${tracksSeed.join(
        '%2C'
      )}`,
    },
  ];

  let defaultGenre = {};
  defaultArr.forEach((item) => {
    if (item.id === params.id) {
      defaultGenre = item;
    }
  });

  const [data, setData] = useState([]);
  const [genreName, setGenreName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      switch (params.id) {
        case 'recent-play':
          await fetchRecentlyPlayedTracks();
          break;
        case 'official-playlists':
          await fetchOfficialPlaylists();
          break;
        case 'recommendations':
          await fetchRecommendations();
          break;
        default:
          await fetchGenrePlaylists(params.id);
          await fetchGenreName(params.id);
          break;
      }
    }
    fetchData();
  }, []);

  const fetchRecentlyPlayedTracks = () => {
    return apiClient
      .get(defaultGenre.fetchUrl)
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
            coverUrl: item.track.album.images[0]?.url,
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
      .get(defaultGenre.fetchUrl)
      .then((res) => {
        let officialPlaylistsArr = res.data.playlists.items.map((item) => {
          return {
            id: item.id,
            uri: item.uri,
            title: item.name,
            descriptions: item.description,
            coverUrl: item.images[0]?.url,
          };
        });
        setData(officialPlaylistsArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRecommendations = () => {
    return apiClient
      .get(defaultGenre.fetchUrl)
      .then((res) => {
        let recommendationsArr = res.data.tracks.map((item) => {
          return {
            id: item.id,
            uri: item.uri,
            title: item.name,
            artistIDs: item.artists.map((artist) => {
              return artist.id;
            }),
            artistNames: item.artists.map((artist) => {
              return artist.name;
            }),
            coverUrl: item.album.images[0]?.url,
          };
        });
        setData(recommendationsArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchGenrePlaylists = (genre) => {
    return apiClient
      .get(`browse/categories/${genre}/playlists?country=TW&limit=50`)
      .then((res) => {
        let genrePlaylists = res.data.playlists.items.map((playlist) => {
          return {
            id: playlist.id,
            uri: playlist.uri,
            title: playlist.name,
            descriptions: playlist.description,
            coverUrl: playlist.images[0]?.url,
          };
        });
        setData(genrePlaylists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchGenreName = (genre) => {
    return apiClient
      .get(`browse/categories/${genre}?country=TW&locale=zh_TW`)
      .then((res) => {
        setGenreName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {data && (
        <CardList
          type={
            ['recent-play', 'recommendations'].includes(params.id)
              ? 'tracks'
              : 'playlists'
          }
          title={genreName !== '' ? genreName : defaultGenre.name}
          detail={false}
        >
          {data}
        </CardList>
      )}
    </>
  );
}

export default Genre;
