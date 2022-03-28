import React from 'react'
import { Layout } from 'antd';
import styled from 'styled-components';
const { Content } = Layout;

function Index({children}) {
  return (
    <StyledContent>{children}</StyledContent>
  )
}

export default Index

const StyledContent = styled(Content)`
  background-color: #121212;
  color: #fff;
  padding: 0 32px;
  overflow-x: hidden;
  overflow-y: scroll;
  h1 {
    color: #fff;
    font-size: 28px;
  }
`;