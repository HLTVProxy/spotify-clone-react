import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfoHeader from '../../common/InfoHeader';
import ActionBar from '../../common/ActionBar';
import SongList from '../../common/SongList';
import HotTrackList from '../../common/HotTrackList';
import CardList from '../../common/CardList';
import styled from 'styled-components';
import apiClient from '../../../spotify';
import { msInfoHeaderFormat } from '../../../helper';

function Track() {
  const params = useParams();
  const [headerInfo, setHeaderInfo] = useState([]);
  const [actionBarInfo, setActionBarInfo] = useState({});
  // const [singleTrack, setSingleTrack] = useState([]);
  const [artist, setArtist] = useState({});
  const [artistTopTracks, setArtistTopTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const trackData = await apiClient
        .get(`tracks/${params.id}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      const isSavedTrack = await apiClient
        .get(`me/tracks/contains?ids=${params.id}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      const artistTopTrackData = await apiClient
        .get(`artists/${trackData.artists[0].id}/top-tracks?market=TW`)
        .then((res) => {
          return res.data.tracks.filter((track, idx) => idx < 8);
        })
        .catch((err) => {
          console.log(err);
        });

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

      let artistTopTrackDataArr = artistTopTrackData.map((track) => {
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

      setHeaderInfo(headerInfoData);
      setActionBarInfo(actionBarData);
      setArtist({
        id: trackData.artists[0].id,
        name: trackData.artists[0].name,
      });
      setArtistTopTracks(artistTopTrackDataArr);
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
          title={`${artist.name} 的熱門發行內容`}
          detailText="查看音樂作品"
          detailHref={`/artist/${artist.id}`}
          type="tracks"
        >
          {artistTopTracks}
        </CardList>
      )}

      {/* 以後視情況更新 */}
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
          <span>藝人</span>
          <h3>任然</h3>
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
