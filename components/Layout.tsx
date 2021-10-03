import { FC } from "react";
import NavHeader, { NavItem } from "./NavHeader/NavHeader";
import styles from '../styles/Home.module.scss'

const navOptions: NavItem[] = [
  { href: '/series', label: "Series" },
  { href: '/characters', label: "Character" },
  { href: '/creators', label: "Creators" },
  { href: '/comics', label: "Comics" },
  { href: '/stories', label: "Stories" },
  { href: '/events', label: "Events" },
]

const Layout: FC<{}> = ({ children }) => {
  return (<>
    <NavHeader options={navOptions}></NavHeader>
    <div className="content">
      {children}
    </div>

    <footer className={styles.footer}>
      <a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>
    </footer>
  </>)
}

export default Layout;