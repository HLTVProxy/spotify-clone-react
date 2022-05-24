import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfoHeader from '../../components/InfoHeader';
import ActionBar from '../../components/ActionBar';
import HotTrackList from '../../components/HotTrackList';
import CardList from '../../components/CardList';
import apiClient from '../../spotify';

function Artist() {
  const params = useParams();
  const [headerInfo, setHeaderInfo] = useState([]);
  const [actionBarInfo, setActionBarInfo] = useState({});
  const [artistTopTrack, setArtistTopTrack] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistSingles, setArtistSingles] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let artistData = {};
      try {
        const res = await apiClient.get(`artists/${params.id}`);
        artistData = res.data;
      } catch (err) {
        console.log(err);
      }

      let isFollowingArtist = [];
      try {
        const res = await apiClient.get(
          `me/following/contains?type=artist&ids=${artistData.id}`
        );
        isFollowingArtist = res.data;
      } catch (err) {
        console.log(err);
      }

      let headerInfoData = {
        title: artistData.name,
        coverUrl: artistData.images[0]?.url,
        followers: parseInt(artistData.followers.total).toLocaleString('en-US'),
      };

      let actionBarData = {
        id: artistData.id,
        uri: artistData.uri,
        isFollowing: isFollowingArtist[0],
      };

      let artistTopTrackData = [];
      try {
        const res = await apiClient.get(
          `artists/${params.id}/top-tracks?market=TW`
        );
        artistTopTrackData = res.data.tracks;
      } catch (err) {
        console.log(err);
      }

      let artistAlbumsData = [];
      try {
        const res = await apiClient.get(
          `artists/${params.id}/albums?include_groups=album&market=TW&limit=8`
        );
        artistAlbumsData = res.data.items.map((album) => {
          return {
            id: album.id,
            uri: album.uri,
            title: album.name,
            descriptions: `${album.release_date.split('-')[0]}・專輯`,
            coverUrl: album.images[0].url,
          };
        });
      } catch (err) {
        console.log(err);
      }

      let artistSinglesData = [];
      try {
        const res = await apiClient.get(
          `artists/${params.id}/albums?include_groups=single&market=TW&limit=8`
        );
        artistSinglesData = res.data.items.map((single) => {
          return {
            id: single.id,
            uri: single.uri,
            title: single.name,
            descriptions: `${single.release_date.split('-')[0]}・${
              single.total_tracks > 1 ? '迷你專輯' : '單曲'
            }`,
            coverUrl: single.images[0].url,
          };
        });
      } catch (err) {
        console.log(err);
      }

      let relatedArtistsData = [];
      try {
        const res = await apiClient.get(`artists/${params.id}/related-artists`);
        relatedArtistsData = res.data.artists
          .filter((artist, idx) => idx < 8)
          .map((artist) => {
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

      setHeaderInfo(headerInfoData);
      setActionBarInfo(actionBarData);
      setArtistTopTrack(artistTopTrackData);
      setArtistAlbums(artistAlbumsData);
      setArtistSingles(artistSinglesData);
      setRelatedArtists(relatedArtistsData);
    };

    fetchData();
  }, [params.id]);

  return (
    <>
      <InfoHeader type="artist" detail={true}>
        {headerInfo}
      </InfoHeader>
      <ActionBar type="artist">{actionBarInfo}</ActionBar>
      <HotTrackList>{artistTopTrack}</HotTrackList>
      <CardList title="專輯" type="artist-albums" detailText="查看音樂作品">
        {artistAlbums}
      </CardList>
      <CardList title="單曲和迷你專輯" type="singles" detailText="查看音樂作品">
        {artistSingles}
      </CardList>
      <CardList title="粉絲也喜歡" type="artists">
        {relatedArtists}
      </CardList>
    </>
  );
}

export default Artist;
