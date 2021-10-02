import { FC } from "react";
import Nav from "./Nav";
import styles from '../styles/Home.module.scss'

const Layout: FC<{}> = ({ children }) => {
    return (<>
        <Nav></Nav>
        <div className="content">
            {children}
        </div>
        

      <footer className={styles.footer}>
        <a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>
      </footer>
    </>)
}

export default Layout;