/** @jsx jsx */
import { jsx } from '@emotion/core';
import NavigationBar from './NavigationBar';
import { NavItemInfo } from './NavItem';

export default function Nav() {
	const navItemList: Array<NavItemInfo> = [
		{ title: 'Log In', target: '/login' },
		{ title: 'Control panel', target: '/control-panel' },
		{ title: 'Editor', target: '/editor' },
	];

	return (
		<div>
			<header
				css={{
					zIndex: 100,
					position: 'fixed',
					top: 0,
					width: '100%',
				}}
			>
				<NavigationBar navItemList={navItemList} />
			</header>
		</div>
	);
}
