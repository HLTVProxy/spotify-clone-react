import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'antd';

const StyledDiv = styled.div`
  padding-top: 16px;

  h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(255, 255, 255, 0.8);
    font-size: 24px;
    transition: all 0.1s ease-in-out;
  }

  img {
    width: 100%;
    opacity: 0.5;
    transition: all 0.1s ease-in-out;
  }

  a:hover {
    h3 {
      color: #fff;
    }
    img {
      opacity: 0.7;
    }
  }
`;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

let dataArr = [];

for (let i = 0; i < 16; i++) {
  dataArr.push(
    <StyledCol xs={12} md={8} lg={8} xl={4} xxl={3} span={24}>
      <Link to="/genre/hiphop">
        <img src="https://i.scdn.co/image/ab67706f000000029bb6af539d072de34548d15c" />
        <h3>嘻哈</h3>
      </Link>
    </StyledCol>
  );
}

function GenreList() {
  return (
    <StyledDiv>
      <h1>瀏覽全部</h1>
      <Row gutter={[16, 16]}>{dataArr}</Row>
    </StyledDiv>
  );
}

export default GenreList;
