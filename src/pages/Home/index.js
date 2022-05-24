import { useState, useEffect, useContext } from 'react';
import CardList from '../../components/CardList';
import apiClient from '../../spotify';
import SeedContext from '../../contexts/TrackSeedContext';

function Home() {
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);
  const [officialPlaylists, setOfficialPlaylists] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const { generateSeed } = useContext(SeedContext);

  useEffect(() => {
    const fetchData = async () => {
      const [recentlyPlayedTracksArr, officialPlaylistsArr] = await Promise.all(
        [fetchRecentlyPlayedTracks(), fetchOfficialPlaylists()]
      );
      const [seed, recommendationsArr] = await fetchRecommendations(
        recentlyPlayedTracksArr
      );

      setRecentlyPlayedTracks(recentlyPlayedTracksArr);
      generateSeed(recentlyPlayedTracksArr);
      setOfficialPlaylists(officialPlaylistsArr);
      setRecommendations({ seed: seed, tracksArr: recommendationsArr });
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
            artistIDs: item.track.artists.map((artist) => {
              return artist.id;
            }),
            artistNames: item.track.artists.map((artist) => {
              return artist.name;
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
            uri: item.uri,
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
            uri: item.uri,
            title: item.name,
            artistIDs: item.artists.map((artist) => {
              return artist.id;
            }),
            artistNames: item.artists.map((artist) => {
              return artist.name;
            }),
            coverUrl: item.album.images[0].url,
          };
        });
        return [seed.join('%2C'), recommendationsArr];
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
        <CardList
          title="猜你喜歡"
          detailHref="/genre/recommendations"
          type="tracks"
        >
          {recommendations.tracksArr}
        </CardList>
      )}
    </>
  );
}

export default Home;
