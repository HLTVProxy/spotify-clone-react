import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Col } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import PlayerContext from '../../../contexts/PlayerContext';
import { msSongListFormat } from '../../../helper';

function SongList({
  title = '',
  detail = true,
  type = '',
  copyright = false,
  children,
}) {
  const { playTrack } = useContext(PlayerContext);

  const columns = [
    {
      title: () => {
        return <div className="order-title">#</div>;
      },
      dataIndex: 'index',
      key: 'index',
      width: '1%',
      render: (index) => {
        let indexObject = JSON.parse(index);
        return (
          <>
            <OrderNum className="order">
              <span className="order-num">{indexObject.index}</span>
              <PlayButton
                icon={<CaretRightOutlined />}
                size="large"
                onClick={() => playTrack(indexObject.uri)}
              />
            </OrderNum>
          </>
        );
      },
    },
    {
      title: '',
      dataIndex: 'coverUrl',
      key: 'coverUrl',
      width: '3%',
      render: (src) => <img src={src} style={{ width: 50 }} />,
    },
    {
      title: '標題',
      dataIndex: 'track',
      key: 'track',
      width: '30%',
      render: (track) => {
        let trackObject = JSON.parse(track);
        return (
          <>
            <p className="track-name">
              <Link to={`/track/${trackObject.id}`}>{trackObject.name}</Link>
            </p>
            <p className="track-artists">
              {trackObject.artists.ids.map((id, idx) => {
                return (
                  <Link to={`/track/${id}`}>
                    {trackObject.artists.names[idx]}
                  </Link>
                );
              })}
            </p>
          </>
        );
      },
    },
    {
      title: '專輯',
      dataIndex: 'album',
      key: 'album',
      width: '30%',
      render: (album) => {
        let albumObject = JSON.parse(album);
        return (
          <p className="track-album">
            <Link to={`/album/${albumObject.id}`}>{albumObject.name}</Link>
          </p>
        );
      },
    },
    // {
    //   title: '已新增日期',
    //   dataIndex: 'addDate',
    //   key: 'addDate',
    //   width: '30%',
    //   responsive: ['sm'],
    // },
    {
      title: () => {
        return (
          <div className="duration">
            <svg
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              fill="white"
            >
              <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
              <path d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"></path>
            </svg>
          </div>
        );
      },
      dataIndex: 'duration',
      key: 'duration',
      width: '6%',
      responsive: ['sm'],
      render: (duration) => {
        return <div className="duration-td">{duration}</div>;
      },
    },
  ];

  const tracks = children.map((track) => {
    const indexObject = {
      index: track.index,
      uri: track.uri,
    };
    const trackObject = {
      id: track.id,
      name: track.name,
      artists: {
        ids: track.artistsIDs,
        names: track.artistsNames,
      },
    };
    const albumObject = {
      id: track.albumID,
      name: track.albumName,
    };
    return {
      index: JSON.stringify(indexObject),
      key: track.id,
      track: JSON.stringify(trackObject),
      album: JSON.stringify(albumObject),
      coverUrl: track.coverUrl,
      duration: msSongListFormat(track.duration),
    };
  });

  return (
    <StyledDiv>
      {title !== '' ? (
        <StyledCol span={24}>
          <h1>{title}</h1>
          {detail == true ? <a href="#!">查看全部</a> : ''}
        </StyledCol>
      ) : (
        ''
      )}
      {children && (
        <StyledTable
          titleName={title}
          columns={columns}
          dataSource={tracks}
          pagination={false}
        />
      )}
      {copyright === true ? (
        <CopyRight>
          <p className="OP">
            <span>©</span>2022 大象音乐
          </p>
          <p className="SP">
            <span style={{ fontSize: 16 }}>℗</span>2022 大象音乐
          </p>
        </CopyRight>
      ) : (
        ''
      )}
    </StyledDiv>
  );
}

export default SongList;

const StyledDiv = styled.div`
  h1 {
    padding-top: 16px;
  }
`;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    cursor: pointer;
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

  .order-title,
  .duration {
    display: flex;
    justify-content: center;
    align-items: center;
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

  .ant-table-cell p {
    margin: 0;
  }

  .track-name a {
    color: #fff;
  }

  .track-artists a,
  .track-album a {
    color: #b3b3b3;
  }

  .ant-table-cell a:hover {
    color: #fff;
    text-decoration: underline;
  }

  .track-artists a:not(:first-of-type)::before {
    content: ',';
    color: #b3b3b3;
    text-decoration: none;
  }

  .duration-td {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 576px) {
    padding-top: 16px;
  }
`;

const CopyRight = styled.div`
  padding-top: 32px;
  p {
    font-size: 12px;
    color: #b3b3b3;
    margin: 0;
  }
  span {
    padding-right: 4px;
  }
  .SP {
    display: flex;
    align-items: center;
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
