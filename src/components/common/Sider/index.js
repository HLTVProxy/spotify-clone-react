import { useState } from 'react';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
// import { DesktopOutlined, PieChartOutlined, FileOutlined } from '@ant-design/icons';

export default function Index({ menu }) {
	return (
		<StyledSider breakpoint={'lg'} theme="light" collapsedWidth={0} trigger={null}>
			{menu}
		</StyledSider>
	);
}

const StyledSider = styled(Sider)`
	height: 100%;
	margin-right: 24px;
`;
