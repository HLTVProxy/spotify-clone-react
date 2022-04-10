import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import StyledContent from '../../common/Content';
import CardList from '../../common/CardList';
import apiClient from '../../../spotify';

function Home() {
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);
  const [officialPlaylists, setOfficialPlaylists] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [recentlyPlayedTracksArr, officialPlaylistsArr] = await Promise.all(
        [fetchRecentlyPlayedTracks(), fetchOfficialPlaylists()]
      );
      const recommendationsArr = await fetchRecommendations(
        recentlyPlayedTracksArr
      );

      setRecentlyPlayedTracks(recentlyPlayedTracksArr);
      setOfficialPlaylists(officialPlaylistsArr);
      setRecommendations(recommendationsArr);
    };
    fetchData();
  }, []);

  const fetchRecentlyPlayedTracks = () => {
    return apiClient
      .get('me/player/recently-played?limit=8')
      .then((res) => {
        let recentlyPlayedTracksArr = res.data.items.map((item) => {
          return {
            id: item.track.id,
            uri: item.track.uri,
            title: item.track.name,
            descriptions: item.track.artists.map((artist) => {
              return { id: artist.id, name: artist.name };
            }),
            coverUrl: item.track.album.images[0].url,
          };
        });
        return recentlyPlayedTracksArr;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchOfficialPlaylists = () => {
    return apiClient
      .get('browse/featured-playlists?country=TW&limit=8')
      .then((res) => {
        let officialPlaylistsArr = res.data.playlists.items.map((item) => {
          return {
            id: item.id,
            title: item.name,
            descriptions: item.description,
            coverUrl: item.images[0].url,
          };
        });
        return officialPlaylistsArr;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRecommendations = (tracksArr) => {
    let seed = [];
    tracksArr.forEach((item, idx) => {
      if (idx < 5) {
        seed.push(item.id);
      }
    });
    return apiClient
      .get(`recommendations?limit=8&seed_tracks=${seed.join('%2C')}`)
      .then((res) => {
        let recommendationsArr = res.data.tracks.map((item) => {
          return {
            id: item.id,
            title: item.name,
            descriptions: item.artists.map((artist) => {
              return { id: artist.id, name: artist.name };
            }),
            coverUrl: item.album.images[0].url,
          };
        });
        return recommendationsArr;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {recentlyPlayedTracks && (
        <CardList
          title="最近播放"
          type="tracks"
          detailHref="/genre/recent-play"
        >
          {recentlyPlayedTracks}
        </CardList>
      )}

      {officialPlaylists && (
        <CardList
          title="官方播放清單"
          type="playlists"
          detailHref="/genre/official-playlists"
        >
          {officialPlaylists}
        </CardList>
      )}
      {recommendations && (
        <CardList title="猜你喜歡" detailHref="/genre/recommendations" type="tracks">
          {recommendations}
        </CardList>
      )}
    </>
  );
}

export default Home;
