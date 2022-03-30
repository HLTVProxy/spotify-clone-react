import React from 'react';
import { Table, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

let data = [
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
  {
    key: '1',
    index: '1',
    cover: 'https://i.scdn.co/image/ab67616d00001e02682cc3e8b1516cdad36f80dc',
    title: '奔赴',
    album: '奔赴',
    addDate: '2022-03-29',
    duration: '3:28',
  },
];

const columns = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    width: '1%',
    render: (order) => (
      <>
        <OrderNum className="order">
          <span className="order-num">{order}</span>
          <PlayButton icon={<CaretRightOutlined />} size="large" />
        </OrderNum>
      </>
    ),
  },
  {
    title: '',
    dataIndex: 'cover',
    key: 'cover',
    width: '3%',
    render: (src) => <img src={src} style={{ width: 50 }} />,
  },
  {
    title: '標題',
    dataIndex: 'title',
    key: 'title',
    width: '30%',
    render: (title) => <StyledLink type="title">{title}</StyledLink>,
  },
  {
    title: '專輯',
    dataIndex: 'album',
    key: 'album',
    width: '30%',
    render: (album) => <StyledLink type="album">{album}</StyledLink>,
  },
  // {
  //   title: '已新增日期',
  //   dataIndex: 'addDate',
  //   key: 'addDate',
  //   width: '30%',
  //   responsive: ['sm'],
  // },
  {
    title: '時長',
    dataIndex: 'duration',
    key: 'duration',
    width: '6%',
    responsive: ['sm'],
  },
];

function SongList({ title }) {
  return (
    <StyledDiv>
      {title != null ? <h1>{title}</h1> : ''}
      <StyledTable
        titleName={title}
        columns={columns}
        dataSource={data}
        pagination={false}
      ></StyledTable>
    </StyledDiv>
  );
}

export default SongList;

const StyledDiv = styled.div`
  h1 {
    padding-top: 16px;
  }
`;

const StyledTable = styled(Table)`
  padding-top: ${(props) => (props.titleName != null ? '8px' : '64px')};
  .ant-table table,
  .ant-table-thead > tr > th {
    background-color: #121212;
    color: #fff;
    border-radius: 0;
  }
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background-color: rgba(255, 255, 255, 0.1);
    .order {
      .order-num {
        display: none;
      }
      button {
        display: block;
      }
    }
  }
  @media (max-width: 576px) {
    padding-top: 16px;
  }
`;

const StyledLink = styled.a`
  color: ${(props) => (props.type === 'title' ? '#fff' : '#b3b3b3')};
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

const OrderNum = styled.div`
  color: #b3b3b3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  min-height: 30px;
  min-width: 30px;
  width: 30px;
`;

const PlayButton = styled(Button)`
  display: none;
  background-color: transparent;
  color: #fff;
  width: 30px;
  border: none;
  &:hover,
  &:active,
  &:focus {
    cursor: default;
    background-color: transparent;
    color: #fff;
  }
`;
