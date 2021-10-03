import { FC } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

export type PaginationProps = {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onClick?: (page: number) => void;
    navigate?: boolean;
}

const Pagination: FC<PaginationProps> = ({ totalItems, pageSize, onClick, navigate, currentPage }) => {
    const router = useRouter();
    const totalPages = Math.ceil(totalItems / pageSize);
    const lastPage = totalPages - 1;
    const hasRightEllipsis = lastPage - currentPage > 3
    const hasLeftEllipsis = currentPage > 3
    const hasBothEllipsis = hasLeftEllipsis && hasRightEllipsis;
    const pagesToDraw = [...Array(totalPages > 7 ? 7 : totalPages)];

    // 0 1 2 3

    // 0 1 2 3 4 5 6
    // 0 1 2 3 4 . 7
    // 0 . 3 4 5 6 7
    // 0 . 2 3 4 . 8
    // 0 1 2 3 4 . 8
    // 0 . 3 4 5 . 8
    // 0 . 4 5 6 7 8


    pagesToDraw[0] = 0
    pagesToDraw[1] = hasLeftEllipsis ? -1 : 1;
    pagesToDraw[5] = hasRightEllipsis ? -2 : lastPage - 1
    pagesToDraw[6] = lastPage

    if (hasLeftEllipsis && hasRightEllipsis) {
        pagesToDraw[2] = currentPage - 1;
        pagesToDraw[3] = currentPage;
        pagesToDraw[4] = currentPage + 1;
    } else if (hasLeftEllipsis) {
        pagesToDraw[2] = lastPage - 4;
        pagesToDraw[3] = lastPage - 3;
        pagesToDraw[4] = lastPage - 2;
    } else {
        pagesToDraw[2] = 2;
        pagesToDraw[3] = 3;
        pagesToDraw[4] = 4;
    }

    function handleClick(newPage: number) {
        if (typeof onClick !== 'function') { return; }

        if (newPage < 0) { newPage = 0; }
        if (newPage > lastPage) { newPage = lastPage; }
        onClick(newPage);
    }

    return (
        <nav className="pagination" role="pagination">
            <a className="pagination-previous" onClick={() => handleClick(currentPage - 1)}>Previous</a>
            <a className="pagination-next" onClick={() => handleClick(currentPage + 1)}>Next page</a>
            <ul className="pagination-list ml-0">
                {pagesToDraw.map((page) => {
                    let link = <span className="pagination-ellipsis">&hellip;</span>;
                    if (page >= 0) {
                        if (navigate) {
                            link = (
                                <Link href={{ ...router, query: { ...router.query, page: page } }} >
                                    <a className={`pagination-link ${page === currentPage ? 'is-current' : ''}`}> {page + 1}</a>
                                </Link>
                            )
                        } else {
                            link = (<a className={`pagination-link ${page === currentPage ? 'is-current' : ''}`} onClick={() => { handleClick(page) }}> {page + 1}</a>)
                        }
                    }
                    return (
                        <li key={page}>
                            {link}
                        </li>
                    )
                })}
            </ul>
        </nav >
    );


}

export default Pagination;