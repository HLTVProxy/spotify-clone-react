import { useState, useEffect } from 'react';
import CollectionTabs from '../CollectionTabs';
import CardList from '../../../components/CardList';
import apiClient from '../../../spotify';

function Artists() {
  const [collectionArtists, setCollectionArtists] = useState([]);

  useEffect(() => {
    fetchCollectionArtists();
  }, []);

  const fetchCollectionArtists = () => {
    apiClient
      .get(`me/following?type=artist&limit=50`)
      .then((res) => {
        let artists = res.data.artists.items.map((artist) => {
          return {
            id: artist.id,
            uri: artist.uri,
            title: artist.name,
            descriptions: '藝人',
            coverUrl: artist.images[0]?.url,
          };
        });
        setCollectionArtists(artists);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <CollectionTabs />
      <CardList title="藝人" type="artists" detail={false}>{collectionArtists}</CardList>
    </>
  );
}

export default Artists;
