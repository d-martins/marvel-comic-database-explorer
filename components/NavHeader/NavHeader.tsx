
import { FC, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import styles from './NavHeader.module.scss';

export type NavItem = { href: string, label: string };

export type NavProps = {
    items: NavItem[]
    justNav?: boolean
}

const NavHeader: FC<NavProps> = ({ items, justNav = false }) => {
    const [isOpenMobile, setOpemMobile] = useState<boolean>(false);

    function toggleOpen() {
        setOpemMobile((old) => { return !old })
    }

    return (
        <nav className={`navbar ${styles["nav-header"]} is-primary is-relative ${justNav ? 'is-simple' : ''}`} role="navigation" aria-label="main navigation">
            <div className="navbar-background">
                <Image
                    src="/nav-bg.png"
                    alt="smaller version of the hero image with the avengers"
                    layout="fill"
                    objectFit="cover"
                    objectPosition={`50%`}

                ></Image>
            </div>
            <div className="navbar-brand">
                <a className="navbar-item p-0" href={"https://www.marvel.com/"}>
                    <Image src="/marvel.svg" alt="the marvel logo" width="130" height="52"></Image>
                </a>

                <a role="button"
                    className={`navbar-burger ${isOpenMobile ? 'is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample" onClick={toggleOpen}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className={`navbar-menu ${isOpenMobile ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <Link href="/">
                        <a className="navbar-item family-secondary has-text-weight-bold" >
                            Ultimate Database Explorer
                        </a>
                    </Link>
                </div>
                <div className="navbar-end">
                    {items.map(option => {
                        return <NavItem key={option.href} option={option}></NavItem>
                    })}
                </div>
            </div>
        </nav>
    )
};

const NavItem: FC<{ option: NavItem }> = ({ option }) => {
    const router = useRouter();
    const isActive = option.href !== '/' && router.pathname.startsWith(option.href);
    const isHomeActive = router.pathname === '/' && option.href === '/'

    return (
        <Link href={option.href}>
            <a className={`navbar-item ${isActive || isHomeActive ? 'is-active' : ''}`}>{option.label}</a>
        </Link>
    )
}

export default NavHeader;