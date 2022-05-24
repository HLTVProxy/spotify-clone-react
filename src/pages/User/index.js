import { useState, useEffect } from 'react';
import InfoHeader from '../../components/InfoHeader';
import CardList from '../../components/CardList';
import SongList from '../../components/SongList';
import apiClient from '../../spotify';

function User() {
  const [userData, setUserData] = useState({});
  const [headerInfo, setHeaderInfo] = useState([]);
  const [userTopArtists, setUserTopArtists] = useState([]);
  const [userTopTracks, setUserTopTracks] = useState([]);
  const [userFollowingArtists, setUserFollowingArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let userData = {};
      try {
        const res = await apiClient.get(`me`);
        userData = res.data;
      } catch (err) {
        console.log(err);
      }

      let headerInfoData = {
        title: userData.display_name,
        coverUrl: userData.images[0]?.url,
        followers: parseInt(userData.followers.total).toLocaleString('en-US'),
      };

      let userTopArtistsData = {};
      try {
        const res = await apiClient.get(
          `me/top/artists?limit=8&time_range=short_term`
        );
        userTopArtistsData = res.data.items.map((artist) => {
          return {
            id: artist.id,
            uri: artist.uri,
            title: artist.name,
            descriptions: '藝人',
            coverUrl: artist.images[0]?.url,
          };
        });
      } catch (err) {
        console.log(err);
      }

      let userTopTracksData = {};
      try {
        const res = await apiClient.get(
          `me/top/tracks?limit=4&time_range=short_term`
        );
        userTopTracksData = res.data.items.map((item, idx) => {
          return {
            index: (idx += 1),
            key: item.id,
            id: item.id,
            name: item.name,
            uri: item.uri,
            artistsIDs: item.artists.map((artist) => artist.id),
            artistsNames: item.artists.map((artist) => artist.name),
            albumName: item.album.name,
            albumID: item.album.id,
            coverUrl: item.album.images[0]?.url,
            duration: item.duration_ms,
          };
        });
      } catch (err) {
        console.log(err);
      }

      let userFollowingArtistsData = [];
      try {
        const res = await apiClient.get(`me/following?type=artist&limit=8`);
        userFollowingArtistsData = res.data.artists.items.map((artist) => {
          return {
            id: artist.id,
            uri: artist.uri,
            title: artist.name,
            descriptions: '藝人',
            coverUrl: artist.images[0]?.url,
          };
        });
      } catch (err) {}

      setUserData({
        id: userData.id,
        name: userData.display_name,
      });
      setHeaderInfo(headerInfoData);
      setUserTopArtists(userTopArtistsData);
      setUserTopTracks(userTopTracksData);
      setUserFollowingArtists(userFollowingArtistsData);
    };

    fetchData();
  }, []);

  return (
    <>
      <InfoHeader type="user" description={false}>
        {headerInfo}
      </InfoHeader>
      <CardList
        title="本月最熱門藝人"
        type="artists"
        detailHref={`/user/userData/${userData.id}/top/artists`}
      >
        {userTopArtists}
      </CardList>
      <SongList type="user" title="本月最熱門曲目">
        {userTopTracks}
      </SongList>
      <CardList title="正在關注" type="followingArtists">
        {userFollowingArtists}
      </CardList>
    </>
  );
}

export default User;
