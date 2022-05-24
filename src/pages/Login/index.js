import React from 'react';
import styled from 'styled-components';
import Logo from '../../img/Spotify_Logo_RGB_White.png';
import { loginEndpoint } from '../../spotify';

function Login() {
  return (
    <LoginDiv>
      <div className="logo-white">
        <img src={Logo} />
      </div>
      <LoginButton href={loginEndpoint}>LOG IN</LoginButton>
    </LoginDiv>
  );
}

export default Login;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: #fff;
  width: 100%;
  height: 100vh;
  img {
    width: 200px;
  }
`;

const LoginButton = styled.a`
  background-color: #1ed760;
  color: #fff;
  font-size: 28px;
  padding: 8px 32px;
  margin-top: 32px;
  border: none;
  border-radius: 8px;
  &:hover {
    color: #fff;
  }
`;
