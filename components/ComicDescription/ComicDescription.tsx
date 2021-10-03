import { FC } from "react";
import { Comic } from "../../models/comic";
import useComicDate from "../../hooks/useMarvelDate";
import styles from "./ComicDescription.module.scss";
import SummaryLinks from "../SummaryLinks/SummaryLinks";

const ComicDescription: FC<{ comic?: Comic }> = ({ comic }) => {
    const date = useComicDate(comic?.dates)

    if (!comic) { return null }

    const description = comic.description || comic?.variantDescription;
    const identifiers = [
        { 'label': 'Diamond Code', value: comic.diamondCode },
        { 'label': 'ean', value: comic.ean },
        { 'label': 'isbn', value: comic.isbn },
        { 'label': 'issn', value: comic.issn },
        { 'label': 'upc', value: comic.upc },
    ].filter(id => id.value);

    return (
        <section className={`${styles["details"]}`}>
            <p className="is-size-7">{date}</p>
            <p className="description">{description}</p>
            <MarvelLink comic={comic}></MarvelLink>
            <div className="id-list  mt-4">
                {identifiers.map((id) => {
                    return (
                        <div key={id.label} className="mr-2 is-size-7">
                            <span className="has-text-weight-bold">{id.label}:</span>
                            <span className="ml-2">{id.value}</span>
                        </div>
                    )
                }) || null}
            </div>
        </section>
    )
}

const MarvelLink: FC<{ comic?: Comic }> = ({ comic }) => {
    const detailsUrl = comic?.urls?.find(url => url.type === "detail");
    if (!detailsUrl) { return null }

    return (
        <a href={detailsUrl.url} target="_blank" rel="noreferrer">
            <button className="button is-primary">
                Check the Marvel page
            </button>
        </a>
    )
}

export default ComicDescription;