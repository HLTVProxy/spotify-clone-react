import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfoHeader from '../../common/InfoHeader';
import ActionBar from '../../common/ActionBar';
import SongList from '../../common/SongList';
import CardList from '../../common/CardList';
import apiClient from '../../../spotify';
import { msInfoHeaderFormat } from '../../../helper';

function Album() {
  const params = useParams();
  const [headerInfo, setHeaderInfo] = useState([]);
  const [actionBarInfo, setActionBarInfo] = useState({});
  const [albumTracks, setAlbumTracks] = useState([]);
  const [albumCopyright, setAlbumCopyright] = useState([]);
  const [artist, setArtist] = useState({});
  const [artistAlbums, setArtistAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const albumData = await apiClient
        .get(`albums/${params.id}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      const artistAlbumsDataArr = await apiClient
        .get(
          `artists/${albumData.artists[0].id}/albums?include_groups=album%2Csingle&market=TW&limit=8`
        )
        .then((res) => {
          return res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });

      let albumMsTotal = 0;
      await albumData.tracks.items.forEach((item) => {
        albumMsTotal += item.duration_ms;
      });

      let headerInfoData = {
        title: albumData.name,
        artists: albumData.artists.map((artist) => {
          return { id: artist.id, name: artist.name };
        }),
        releaseDate: albumData.release_date.split('-'),
        coverUrl: albumData.images[0]?.url,
        duration: msInfoHeaderFormat(albumMsTotal),
        albumType: albumData.album_type,
        trackCount: albumData.total_tracks,
      };

      let actionBarData = {
        id: albumData.id,
        uri: albumData.uri,
      };

      let albumTracksData = albumData.tracks.items.map((track, idx) => {
        return {
          index: (idx += 1),
          key: track.id,
          id: track.id,
          name: track.name,
          uri: track.uri,
          artistsIDs: track.artists.map((artist) => artist.id),
          artistsNames: track.artists.map((artist) => artist.name),
          duration: track.duration_ms,
        };
      });

      let albumCopyrightData = albumData.copyrights.map((copyright) => {
        return {type: copyright.type, text: copyright.text}
      })

      let artistAlbumsData = artistAlbumsDataArr.map((album) => {
        return {
          id: album.id,
          uri: album.uri,
          title: album.name,
          descriptions: `${album.release_date.split('-')[0]}・專輯`,
          coverUrl: album.images[0].url,
        };
      });

      setHeaderInfo(headerInfoData);
      setActionBarInfo(actionBarData);
      setAlbumTracks(albumTracksData);
      setAlbumCopyright(JSON.stringify(albumCopyrightData));
      setArtist({
        id: albumData.artists[0].id,
        name: albumData.artists[0].name,
      });
      setArtistAlbums(artistAlbumsData);
    };

    fetchData();
  }, [params.id]);
  return (
    <>
      {headerInfo && (
        <InfoHeader type="album" description={false} detail={true}>
          {headerInfo}
        </InfoHeader>
      )}
      {actionBarInfo && <ActionBar>{actionBarInfo}</ActionBar>}
      {albumTracks && albumCopyright && (
        <SongList type="album" copyright={albumCopyright}>
          {albumTracks}
        </SongList>
      )}
      {headerInfo && artistAlbums && (
        <CardList
          title={`更多來自 ${artist.name} 的內容`}
          type="album"
          detailText="查看音樂作品"
          detailHref={`/artist/${artist.id}`}
        >
          {artistAlbums}
        </CardList>
      )}
    </>
  );
}

export default Album;
