import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardList from '../../common/CardList';
import apiClient from '../../../spotify';

function Artists() {
  let params = useParams();
  const [artistsResult, setArtistsResult] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetchArtistsResult();
    };
    fetchData();
  }, [params.searchText]);

  const fetchArtistsResult = () => {
    apiClient
      .get(`search?q=${params.searchText}&type=artist&limit=50`)
      .then((res) => {
        let resultArtists = res.data.artists.items.map((artist) => {
          return {
            id: artist.id,
            uri: artist.uri,
            title: artist.name,
            descriptions: '藝人',
            coverUrl: artist.images[0]?.url,
          };
        });
        setArtistsResult(resultArtists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {artistsResult && (
        <CardList type="artists" title={`「${params.searchText}」的所有藝人`} detail={false}>
          {artistsResult}
        </CardList>
      )}
    </>
  );
}

export default Artists;
