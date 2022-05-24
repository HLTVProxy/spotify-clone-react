import React from 'react';
import styled from 'styled-components';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function PageActionButton() {
  return (
    <ButtonGroup>
      <StyledActionButton
        onClick={() => {
          window.history.back();
        }}
      >
        <LeftOutlined style={{ width: 24 }} />
      </StyledActionButton>
      <StyledActionButton
        onClick={() => {
          window.history.forward();
        }}
      >
        <RightOutlined style={{ width: 24 }} />
      </StyledActionButton>
    </ButtonGroup>
  );
}

export default PageActionButton;

const ButtonGroup = styled.div`
  display: flex;
  margin-left: 16px;
`;

const StyledActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: #000;
  color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  margin-right: 16px;
  cursor: pointer;
`;
