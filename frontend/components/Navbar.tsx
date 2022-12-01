import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import client from '../lib/Client';
import NavItem from './NavItem';

type href=string;

let MENU_LIST = [
	{ text: 'Home', href: '/' },
	{ text: 'Video', href: '/fun' },
];
const Navbar = () => {

  
	const [navActive, setNavActive] = useState<any | null>(null);
	const [activeIdx, setActiveIdx] = useState(0);

  

	return (
		<header>
			<nav className={`nav`}>
				<Link href={'/'}>
					<a>
						<h1 className="logo">Where is @?</h1>
					</a>
				</Link>
				<div
					onClick={() => setNavActive(!navActive)}
					className={`nav__menu-bar`}>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className={`${navActive ? 'active' : ''} nav__menu-list`}>
					{MENU_LIST.map((menu, idx) => (
						<div
							onClick={() => {
								setActiveIdx(idx);
								setNavActive(false);
							}}
							key={menu.text}>
							<NavItem active={activeIdx === idx} {...menu} />
						</div>
					))}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
