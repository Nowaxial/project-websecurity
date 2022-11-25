import Link from "next/link";
import React, { useState } from "react";
import client from "./Client";
import NavItem from "./NavItem";

const logOut = async () =>{
  await client.get('/logout')
}

const checkRoles = async() =>{

};

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text : 'Logout', href: '/' , onclick:(logOut)},
  { text: "Profil", href: "/profil" }

  /* { text: "Tickets", href: "/tickets" },
  { text: "Register", href: "/register" },
  { text: "Login", href: "/login" }, */
];
const Navbar = () => {
  const [navActive, setNavActive] = useState<any | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
          <a>
            <h1 className="logo">Where is @?</h1>
          </a>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;