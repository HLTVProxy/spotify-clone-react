import { Layout, Menu } from 'antd';
const { Sider } = Layout;
// import { DesktopOutlined, PieChartOutlined, FileOutlined } from '@ant-design/icons';

export default function Index({ menu }) {
  return (
    <Sider
      breakpoint={'lg'}
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
      {menu}
    </Sider>
  );
}

