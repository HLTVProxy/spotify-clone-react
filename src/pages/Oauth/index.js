import axios from 'axios';
import { Buffer } from 'buffer';
import qs from 'qs';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  refreshEndpoint,
  clientID,
  clientSecret,
  redirectUri,
  setClientToken,
} from '../../spotify';
import AuthContext from '../../contexts/AuthContext';

function Oauth() {
  const navigate = useNavigate();
  const { accessToken, setUserAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (
      accessToken === '' &&
      window.localStorage.getItem('refresh_token') === null
    ) {
      const fetchAuthData = async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code');

        const formData = {
          code: code,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        };

        const config = {
          headers: {
            Authorization: `Basic ${new Buffer.from(
              `${clientID}:${clientSecret}`
            ).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };

        const authData = await axios
          .post(refreshEndpoint, qs.stringify(formData), config)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log(err);
          });
        setUserAccessToken(authData?.access_token);
        setClientToken(authData?.access_token);
        window.localStorage.setItem('refresh_token', authData?.refresh_token);
        navigate('/');
      };
      fetchAuthData();
    } else {
      const fetchRefreshToken = async () => {
        const refreshToken = window.localStorage.getItem('refresh_token');

        const formData = {
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        };

        const config = {
          headers: {
            Authorization: `Basic ${new Buffer.from(
              `${clientID}:${clientSecret}`
            ).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };

        const authData = await axios
          .post(refreshEndpoint, qs.stringify(formData), config)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log(err);
          });
        setUserAccessToken(authData?.access_token);
        setClientToken(authData?.access_token);
        navigate('/');
      };
      fetchRefreshToken();
    }
  }, [accessToken]);
  return <></>;
}

export default Oauth;
