import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';
import CustomCard from './CustomCard';

function CardList({
  title,
  type = 'albums',
  detail = true,
  detailText = '查看全部',
  detailHref = '',
  children,
}) {

  // Render card
  let CardArray = children?.map((item) => {
    return <CustomCard key={item.id} type={type} item={item} />;
  });

  return (
    <>
      <Row>
        <StyledCol span={24}>
          <h1>{title}</h1>
          {detail === true && children?.length === 8 ? (
            <Link to={detailHref}>{detailText}</Link>
          ) : (
            ''
          )}
        </StyledCol>
      </Row>
      <Row gutter={[16, 16]}>{CardArray?.length > 0 ? CardArray : ''}</Row>
    </>
  );
}

export default CardList;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  div {
    cursor: pointer;
  }
  a {
    color: #b3b3b3;
    &:hover {
      text-decoration: underline;
    }
  }
`;

