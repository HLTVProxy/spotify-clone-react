import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'antd';

function GenreList({ children }) {
  let dataArr = children.map((genre) => {
    return (
      <StyledCol xs={12} md={8} lg={8} xl={4} xxl={3} span={24}>
        <Link to={`/genre/${genre.id}`}>
          <img src={genre.img} alt="genre image"/>
          <h3>{genre.name}</h3>
        </Link>
      </StyledCol>
    );
  });
  return (
    <StyledDiv>
      <h1>瀏覽全部</h1>
      <Row gutter={[16, 16]}>{dataArr}</Row>
    </StyledDiv>
  );
}

export default GenreList;

const StyledDiv = styled.div`
  padding-top: 16px;

  h3 {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ddd;
    font-size: 24px;
    transition: all 0.1s ease-in-out;
  }

  img {
    width: 100%;
    border-radius: 8px;
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
