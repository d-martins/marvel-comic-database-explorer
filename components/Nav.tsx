import { FC } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'
import { route } from "next/dist/server/router";

type NavProps = {

}

type NavItem = {
    href: string;
    label: string;
}

const navigation: NavItem[] = [
    { href: '/', label: "Home" },
    { href: '/series', label: "Series" },
    { href: '/characters', label: "Character" },
    { href: '/creators', label: "Creators" },
    { href: '/comics', label: "Comics" },
    { href: '/stories', label: "Stories" },
    { href: '/events', label: "Events" },
]

const Nav: FC<NavProps> = ({ }) => {
    const router = useRouter();

    return (
        <>
            <ul>
                {navigation.map(navItem => (
                    <Link href={navItem.href} key={navItem.href}>
                        <a style={{color: router.pathname.startsWith(navItem.href) ? 'red' : ''}}>{navItem.label}</a>
                    </Link>
                ))}
            </ul>
        </>
    )
};

export default Nav;