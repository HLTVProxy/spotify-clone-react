const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientID = '3313d446024e4c62ace5701e3ee16716';
const redirectUri = 'http://localhost:3000/';
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
  'user-library-modify',
  'user-library-read',
];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scopes=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;
