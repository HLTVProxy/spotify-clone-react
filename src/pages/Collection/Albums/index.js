import { useState, useEffect } from 'react';
import CollectionTabs from '../CollectionTabs';
import CardList from '../../../components/CardList';
import apiClient from '../../../spotify';

function Albums() {
  const [collectionAlbums, setCollectionAlbums] = useState([]);

  useEffect(() => {
    fetchCollectionAlbums();
  }, []);

  const fetchCollectionAlbums = () => {
    apiClient
      .get(`me/albums?limit=50`)
      .then((res) => {
        let albums = res.data.items.map((item) => {
          return {
            id: item.album.id,
            uri: item.album.uri,
            title: item.album.name,
            artistIDs: item.album.artists.map((artist) => {
              return artist.id;
            }),
            artistNames: item.album.artists.map((artist) => {
              return artist.name;
            }),
            coverUrl: item.album.images[0]?.url,
          };
        });
        setCollectionAlbums(albums);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CollectionTabs />
      <CardList title="專輯" type="albums" detail={false}>
        {collectionAlbums}
      </CardList>
    </>
  );
}

export default Albums;
