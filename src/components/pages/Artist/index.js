import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfoHeader from '../../common/InfoHeader';
import ActionBar from '../../common/ActionBar';
import HotTrackList from '../../common/HotTrackList';
import CardList from '../../common/CardList';
import apiClient from '../../../spotify';

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
      const artistData = await apiClient
        .get(`artists/${params.id}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      const artistTopTrackData = await apiClient
        .get(`artists/${params.id}/top-tracks?market=TW`)
        .then((res) => {
          return res.data.tracks;
        })
        .catch((err) => {
          console.log(err);
        });

      const artistAlbumsDataArr = await apiClient
        .get(
          `artists/${params.id}/albums?include_groups=album&market=TW&limit=8`
        )
        .then((res) => {
          return res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });

      const artistSinglesDataArr = await apiClient
        .get(
          `artists/${params.id}/albums?include_groups=single&market=TW&limit=8`
        )
        .then((res) => {
          return res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });

      const relatedArtistsDataArr = await apiClient
        .get(
          `artists/${params.id}/related-artists`
        )
        .then((res) => {
          return res.data.artists.filter((artist, idx) => idx < 8);
        })
        .catch((err) => {
          console.log(err);
        });

      let headerInfoData = {
        title: artistData.name,
        coverUrl: artistData.images[0]?.url,
        followers: parseInt(artistData.followers.total).toLocaleString('en-US'),
      };

      let actionBarData = {
        id: artistData.id,
        uri: artistData.uri,
      };

      let artistAlbumsData = artistAlbumsDataArr.map((album) => {
        return {
          id: album.id,
          uri: album.uri,
          title: album.name,
          descriptions: `${album.release_date.split('-')[0]}・專輯`,
          coverUrl: album.images[0].url,
        };
      });

      let artistSinglesData = artistSinglesDataArr.map((single) => {
        return {
          id: single.id,
          uri: single.uri,
          title: single.name,
          descriptions: `${single.release_date.split('-')[0]}・${single.total_tracks > 1 ? '迷你專輯' : '單曲'}`,
          coverUrl: single.images[0].url,
        };
      });

      let relatedArtistsData = relatedArtistsDataArr.map((artist) => {
        return {
          id: artist.id,
          uri: artist.uri,
          title: artist.name,
          descriptions: '藝人',
          coverUrl: artist.images[0]?.url,
        };
      });

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
      <InfoHeader type="artist" detail={true}>{headerInfo}</InfoHeader>
      <ActionBar type="artist">{actionBarInfo}</ActionBar>
      <HotTrackList>{artistTopTrack}</HotTrackList>
      <CardList title="專輯" type="artist-albums" detailText="查看音樂作品">
        {artistAlbums}
      </CardList>
      <CardList title="單曲和迷你專輯" type="singles" detailText="查看音樂作品">{artistSingles}</CardList>
      <CardList title="粉絲也喜歡" type="artists">{relatedArtists}</CardList>
    </>
  );
}

export default Artist;
