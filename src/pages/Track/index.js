import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfoHeader from '../../components/InfoHeader';
import ActionBar from '../../components/ActionBar';
import SongList from '../../components/SongList';
import HotTrackList from '../../components/HotTrackList';
import CardList from '../../components/CardList';
import styled from 'styled-components';
import apiClient from '../../spotify';
import { msInfoHeaderFormat } from '../../helper';

function Track() {
  const params = useParams();
  const [headerInfo, setHeaderInfo] = useState([]);
  const [actionBarInfo, setActionBarInfo] = useState({});
  // const [singleTrack, setSingleTrack] = useState([]);
  const [artist, setArtist] = useState({});
  const [artistTopTracks, setArtistTopTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let trackData = {};
      try {
        const res = await apiClient.get(`tracks/${params.id}`);
        trackData = res.data;
      } catch (err) {
        console.log(err);
      }

      let isSavedTrack = [];
      try {
        const res = await apiClient.get(`me/tracks/contains?ids=${params.id}`);
        isSavedTrack = res.data;
      } catch (err) {
        console.log(err);
      }

      let headerInfoData = {
        title: trackData.name,
        artists: trackData.artists.map((artist) => {
          return { id: artist.id, name: artist.name };
        }),
        releaseDate: trackData.album.release_date.split('-'),
        coverUrl: trackData.album.images[0]?.url,
        duration: msInfoHeaderFormat(trackData.duration_ms),
      };

      let actionBarData = {
        id: trackData.id,
        uri: trackData.uri,
        isSave: isSavedTrack[0],
      };

      let artistTopTrackData = [];
      try {
        const res = await apiClient.get(
          `artists/${trackData.artists[0].id}/top-tracks?market=TW`
        );
        artistTopTrackData = res.data.tracks
          .filter((track, idx) => idx < 8)
          .map((track) => {
            return {
              id: track.id,
              uri: track.uri,
              title: track.name,
              artistIDs: track.artists.map((artist) => {
                return artist.id;
              }),
              artistNames: track.artists.map((artist) => {
                return artist.name;
              }),
              coverUrl: track.album.images[0].url,
            };
          });
      } catch (err) {
        console.log(err);
      }

      setHeaderInfo(headerInfoData);
      setActionBarInfo(actionBarData);
      setArtist({
        id: trackData.artists[0].id,
        name: trackData.artists[0].name,
      });
      setArtistTopTracks(artistTopTrackData);
    };

    fetchData();
  }, [params.id]);

  return (
    <>
      {headerInfo && (
        <InfoHeader type="track" description={false} detail={true}>
          {headerInfo}
        </InfoHeader>
      )}

      {actionBarInfo && <ActionBar>{actionBarInfo}</ActionBar>}

      {headerInfo && artistTopTracks && (
        <CardList
          title={`${artist.name} ?????????????????????`}
          detailText="??????????????????"
          detailHref={`/artist/${artist.id}`}
          type="tracks"
        >
          {artistTopTracks}
        </CardList>
      )}

      {/* ????????????????????? */}
      {/* <SongList detail={false}>{singleTrack}</SongList> */}
      {/* <ArtistButton
        onClick={() => {
          navigate(`/artist/ccc`);
        }}
      >
        <img
          src="https://img.mymusic.net.tw/mms/album/L/755/5410755.jpg"
          alt="Artist Image"
        />
        <div className="artist-text">
          <span>??????</span>
          <h3>??????</h3>
        </div>
      </ArtistButton> */}
      {/* <HotTrackList title={headerInfo.artists[0].name} type="track" /> */}
    </>
  );
}

export default Track;

const ArtistButton = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 8px;
  transition: all 0.3 ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.1);
  }
  img {
    width: 80px;
    border-radius: 50%;
  }
  h3 {
    color: #fff;
  }
  .artist-text {
    padding-left: 16px;
    span {
      font-size: 12px;
    }
  }
`;
