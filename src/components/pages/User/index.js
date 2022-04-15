import { useState, useEffect } from 'react';
import InfoHeader from '../../common/InfoHeader';
import CardList from '../../common/CardList';
import SongList from '../../common/SongList';
import apiClient from '../../../spotify';

function User() {
  const [userData, setUserData] = useState({});
  const [headerInfo, setHeaderInfo] = useState([]);
  const [userTopArtists, setUserTopArtists] = useState([]);
  const [userTopTracks, setUserTopTracks] = useState([]);
  const [userFollowingArtists, setUserFollowingArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await apiClient
        .get(`me`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      const userTopArtistsDataArr = await apiClient
        .get(`me/top/artists?limit=8&time_range=short_term`)
        .then((res) => {
          return res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });

      const userTopTracksDataArr = await apiClient
        .get(`me/top/tracks?limit=4&time_range=short_term`)
        .then((res) => {
          return res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });

      const userFollowingArtistsDataArr = await apiClient
        .get(`me/following?type=artist&limit=8`)
        .then((res) => {
          return res.data.artists.items;
        })
        .catch((err) => {
          console.log(err);
        });

      let headerInfoData = {
        title: userData.display_name,
        coverUrl: userData.images[0]?.url,
        followers: parseInt(userData.followers.total).toLocaleString('en-US'),
      };
      let userTopArtistsData = userTopArtistsDataArr.map((artist) => {
        return {
          id: artist.id,
          uri: artist.uri,
          title: artist.name,
          descriptions: '藝人',
          coverUrl: artist.images[0]?.url,
        };
      });
      let userTopTracksData = userTopTracksDataArr.map((item, idx) => {
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
      let userFollowingArtistsData = userFollowingArtistsDataArr.map(
        (artist) => {
          return {
            id: artist.id,
            uri: artist.uri,
            title: artist.name,
            descriptions: '個人檔案',
            coverUrl: artist.images[0]?.url,
          };
        }
      );

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
