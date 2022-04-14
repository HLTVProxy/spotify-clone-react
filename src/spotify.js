import axios from 'axios';

const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientID = 'ea8435ec4ef94ad199b1cec54848fec0';
const redirectUri = 'http://localhost:3000';
const scopes = [
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-follow-modify',
  'user-follow-read',
  'user-read-recently-played',
  'user-top-read',
  'playlist-read-collaborative',
  'playlist-read-private',
  'playlist-modify-private',
  'app-remote-control',
  'streaming',
  'user-read-private',
  'user-read-email',
  'user-library-modify',
  'user-library-read',
];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({ baseURL: 'https://api.spotify.com/v1/' });

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default apiClient;
