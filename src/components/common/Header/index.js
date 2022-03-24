import { useState } from 'react';
import logo from './../../../img/Spotify_Icon_RGB_Green.png';
import { Layout, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Header } = Layout;

export default function Index({ menu }) {
	const [visible, setVisible] = useState(false);
	return (
		<Header>
			<StyledNav>
				<StyledButton className="menu" type="primary" icon={<MenuOutlined />} onClick={() => setVisible(true)} />
				<Drawer placement="left" onClick={() => setVisible(false)} onClose={() => setVisible(false)} visible={visible}>
					{menu}
				</Drawer>
				<a href="/">
					<img src={logo} className="logo" alt="logo" />
				</a>
			</StyledNav>
		</Header>
	);
}

const StyledNav = styled.nav`
	display: flex;
	align-items: center;
	.logo {
		height: 32px;
		margin-left: 16px;
	}
	@media (min-width: 992px) {
		.menu {
			display: none;
		}
		.logo {
			margin-left: 0px;
		}
	}
`;

const StyledButton = styled(Button)`
	background-color: rgba(0, 0, 0, 0.85);
	border-color: rgba(0, 0, 0, 0.85);
	&:hover {
		background-color: rgba(0, 0, 0, 0.85);
		border-color: rgba(0, 0, 0, 0.85);
	}
`;
