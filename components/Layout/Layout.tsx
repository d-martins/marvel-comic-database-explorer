import { FC } from "react";
import NavHeader, { NavItem } from "../NavHeader/NavHeader";
import styles from './Layout.module.scss'

const navOptions: NavItem[] = [
  { href: '/series', label: "Series" },
  { href: '/characters', label: "Character" },
  { href: '/creators', label: "Creators" },
  { href: '/comics', label: "Comics" },
  { href: '/stories', label: "Stories" },
  { href: '/events', label: "Events" },
]

const Layout: FC<{}> = ({ children }) => {
  return (
    <div className={`${styles.layout} is-flex is-flex-direction-column`}>
      <div className="nav-zone">
        <NavHeader options={navOptions}></NavHeader>
      </div>

      <div className="content is-flex-grow-1">
        {children}
      </div>

      <footer className={`${styles.footer}`}>
        <a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>
      </footer>
    </div>
  )
}

export default Layout;