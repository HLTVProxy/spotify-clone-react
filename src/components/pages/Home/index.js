import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import StyledContent from '../../common/Content';
import CardList from '../../common/CardList';
import apiClient from '../../../spotify';

function Home() {
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);
  useEffect(() => {
    fetchRecentlyPlayedTracks();
  }, []);

  const fetchRecentlyPlayedTracks = async () => {
    apiClient
      .get('me/player/recently-played?limit=8')
      .then((res) => {
        let recentlyPlayedTracksArr = res.data.items.map((item) => {
          return {
            id: item.track.id,
            title: item.track.name,
            descriptions: item.track.artists.map((artist) => {
              return { id: artist.id, name: artist.name };
            }),
            coverUrl: item.track.album.images[0].url,
          };
        });
        setRecentlyPlayedTracks(recentlyPlayedTracksArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CardList title="最近播放" type="tracks" detailHref="/genre/recent-play">
        {recentlyPlayedTracks.map((track) => track)}
      </CardList>
      {/* <CardList
        title="官方播放清單"
        type="playlists"
        detailHref="/genre/official-playlists"
      />
      <CardList title="猜你喜歡" detailHref="/genre/recommendation" /> */}
    </>
  );
}

export default Home;
