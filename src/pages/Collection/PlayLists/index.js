import { useState, useEffect } from 'react';
import CollectionTabs from '../CollectionTabs';
import CardList from '../../../components/CardList';
import apiClient from '../../../spotify';

function PlayLists() {
  const [collectionPlaylists, setCollectionPlaylists] = useState([]);

  useEffect(() => {
    fetchCollectionPlaylists();
  }, []);

  const fetchCollectionPlaylists = () => {
    apiClient
      .get(`/me/playlists`)
      .then((res) => {
        let playlists = res.data.items.map((playlist) => {
          return {
            id: playlist.id,
            uri: playlist.uri,
            title: playlist.name,
            descriptions: playlist.description ? playlist.description : `來自 ${playlist.owner.display_name}`,
            coverUrl: playlist.images[0]?.url,
          };
        });
        setCollectionPlaylists(playlists);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <CollectionTabs />
      <CardList title="播放清單" type="collectionPlaylist" detail={false}>{collectionPlaylists}</CardList>
    </>
  );
}

export default PlayLists;
