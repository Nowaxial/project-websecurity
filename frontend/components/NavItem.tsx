import Link from "next/link";

const NavItem = ({ text, href, active } : { text:string, href:string, active:boolean }) => {
  return (
    <Link href={href}>
      <a className={`nav__link`}>{text}</a>
    </Link>
  );
};

export default NavItem;
