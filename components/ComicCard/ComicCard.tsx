import { FC } from "react";
import ImageCard from '../../components/Card/Card';
import useComicDate from "../../hooks/useMarvelDate";
import useMarvelImage from "../../hooks/useMarvelImage";
import { Comic } from "../../models/comic";
import { CreatorSummary } from "../../models/creators";


const ComicCard: FC<{ comic: Comic }> = ({ comic }) => {
    const title = comic.title || ''
    const thumbnail = useMarvelImage(comic.thumbnail);
    const byline = useComicDate(comic.dates);
    const creatorLinks = getCreatorLinks(comic.creators?.items);

    function getCreatorLinks(creators?: CreatorSummary[]) {
        if (!creators) { return []; }

        // filters out creators that don't have the info we need to build the link
        const useableCreators = creators.filter(creator => creator.name && creator.resourceURI) || []

        return useableCreators.map(creator => {
            return {
                label: creator.name || '',
                href: `/creators/${creator.resourceURI?.split('/').pop()}`
            }
        })
    }

    return <ImageCard
        title={title}
        byline={byline}
        links={creatorLinks}
        thumbnail={{ src: thumbnail, alt: 'cover image of the comic issue' }}
        useOverlay={true}
        href={`/comics/${comic.id}`}
    ></ImageCard>
}

export default ComicCard