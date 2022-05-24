import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SongList from '../../components/SongList';
import apiClient from '../../spotify';

function Tracks() {
  let params = useParams();
  const [tracksResult, setTracksResult] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetchTracksResult();
    };
    fetchData();
  }, [params.searchText]);

  const fetchTracksResult = () => {
    apiClient
      .get(`search?q=${params.searchText}&type=track&limit=50`)
      .then((res) => {
        let resultTracks = res.data.tracks.items.map((track, idx) => {
          return {
            index: (idx += 1),
            key: track.id,
            id: track.id,
            name: track.name,
            uri: track.uri,
            artistsIDs: track.artists.map((artist) => artist.id),
            artistsNames: track.artists.map((artist) => artist.name),
            albumName: track.album.name,
            albumID: track.album.id,
            coverUrl: track.album.images[0]?.url,
            duration: track.duration_ms,
          };
        });
        setTracksResult(resultTracks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>{tracksResult && <SongList detail={false}>{tracksResult}</SongList>}</>
  );
}

export default Tracks;
