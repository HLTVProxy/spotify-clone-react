import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import InfoHeader from '../../components/InfoHeader';
import ActionBar from '../../components/ActionBar';
import SongList from '../../components/SongList';
import apiClient from '../../spotify';
import { msInfoHeaderFormat } from '../../helper';
import UserContext from '../../contexts/UserContext';

function PlayList() {
  const params = useParams();
  const [headerInfo, setHeaderInfo] = useState([]);
  const [actionBarInfo, setActionBarInfo] = useState({});
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isPlaylistSaved, setPlaylistSaved] = useState(false);
  const { currentUserID } = useContext(UserContext);

  useEffect(() => {
    fetchPlaylist();
  }, [params.id]);

  const fetchPlaylist = () => {
    apiClient
      .get(`playlists/${params.id}`)
      .then((res) => {
        let tracksMsTotal = 0;
        let filterUndefineTracks = res.data.tracks.items.filter((item) => {
          return item.track?.duration_ms !== undefined;
        });

        filterUndefineTracks.forEach((item, idx) => {
          tracksMsTotal +=
            item.track.duration_ms !== undefined ? item.track.duration_ms : 0;
        });

        let headerInfoData = {
          title: res.data.name,
          description: res.data.description,
          coverUrl: res.data.images[0]?.url,
          owner: res.data.owner.display_name,
          followers: parseInt(res.data.followers.total).toLocaleString('en-US'),
          trackCount: res.data.tracks.total,
          duration: msInfoHeaderFormat(tracksMsTotal),
        };
        setHeaderInfo(headerInfoData);

        let actionBarData = {
          id: res.data.id,
          uri: res.data.uri,
        };
        setActionBarInfo(actionBarData);

        let resultTracks = filterUndefineTracks.map((item, idx) => {
          return {
            index: (idx += 1),
            key: item.track.id,
            id: item.track.id,
            name: item.track.name,
            uri: item.track.uri,
            artistsIDs: item.track.artists.map((artist) => artist.id),
            artistsNames: item.track.artists.map((artist) => artist.name),
            albumName: item.track.album.name,
            albumID: item.track.album.id,
            coverUrl: item.track.album.images[0]?.url,
            duration: item.track.duration_ms,
          };
        });
        setPlaylistTracks(resultTracks);

        return apiClient.get(
          `playlists/${params.id}/followers/contains?ids=${currentUserID}`
        );
      })
      .then((res) => {
        setPlaylistSaved(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <InfoHeader detail={true}>{headerInfo}</InfoHeader>
      <ActionBar type="playlist" isPlaylistSaved={isPlaylistSaved}>
        {actionBarInfo}
      </ActionBar>
      <SongList>{playlistTracks}</SongList>
    </>
  );
}

export default PlayList;
