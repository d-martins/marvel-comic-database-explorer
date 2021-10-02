import type { NextPage } from 'next'
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Comic, ComicDate, ComicOrderByFields, ComicQueryOptions } from '../../models/comic';
import { MarvelApiResponse, MarvelImage, OrderDirection } from '../../models/marvelApi';
import { ComicsService } from '../../services/marvel-api';
import { ColumnSizes } from '../../models/bulma';
import { DropdownOption } from '../../components/Dropdown/Dropdown';
import { CreatorSummary } from '../../models/creators';

import LoadScreen from '../../components/LoadScreen/LoadScreen';
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';
import Card from '../../components/Card/Card';
import GridLayout from '../../components/GridLayout/GridLayout';
import FilterLayout from '../../components/FilterLayout/FilterLayout';
import useDebounce from '../../hooks/useDebounce';

async function getData(query: ComicQueryOptions) {
    return await ComicsService.getComicsList(query)
}

const columnOptions: DropdownOption[] = [
    { value: ComicOrderByFields.Title, label: "Title" },
    { value: ComicOrderByFields.IssueNumber, label: "Issue number" },
    { value: ComicOrderByFields.Modified, label: "Last modified" },
    { value: ComicOrderByFields.OnsaleDate, label: "Sale date" },
    { value: ComicOrderByFields.FocDate, label: "Final order date" },
]
const directionOptions: DropdownOption[] = [
    { value: OrderDirection.Ascending, label: "Ascending" },
    { value: OrderDirection.Descending, label: "Descending" },
]

const ComicsListPage: NextPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [isSearching, setSearching] = useState(false);
    const [data, setData] = useState<MarvelApiResponse<Comic> | undefined>(undefined)
    const [error, setError] = useState<string>();

    const [suggestions, setSuggestions] = useState<DropdownOption[]>([]);
    const [searchWord, setSearchWord] = useState<string>("");
    const [filterWord, setFilterWord] = useState<string>("");

    const [sortColumn, setSortColumn] = useState<ComicOrderByFields>(ComicOrderByFields.OnsaleDate);
    const [sortDirection, setSortDirection] = useState<OrderDirection>(OrderDirection.Descending);

    const debouncedSearchWord = useDebounce(searchWord, 500);
    const results = data?.data?.results || [{}]

    const query = useMemo(() => {
        const now = new Date();
        const pastDate = new Date(now.getFullYear() - 200, now.getMonth() + 1, now.getDate());

        return {
            dateRange: [pastDate, now], // don't list upcoming titles
            orderBy: sortColumn,
            orderDirection: sortDirection,
            titleStartsWith: filterWord
        }
    }, [sortColumn, sortDirection, filterWord])

    // memoizes the load data function so it can be called inside effects
    const loadData = useCallback(() => {
        setLoading(true);

        getData(query).then(handleResponse);
    }, [query])

    // loads data according to the latest query options
    useEffect(() => { loadData() }, [loadData])

    // loads the suggestions a few ms after the user searches something
    useEffect(() => {
        if (!debouncedSearchWord) {
            setSuggestions([]);
            return;
        }

        setSearching(true);
        getData({
            titleStartsWith: debouncedSearchWord
        }).then(handleSearchResponse)
    }, [debouncedSearchWord])


    const handleResponse = (resp: MarvelApiResponse<Comic>) => {
        setData(resp);
        setLoading(false);

        if (resp.code !== 200) {
            setError(resp.status);
        } else if (resp.data?.count === 0) {
            setError("Couldn't find any results");
        } else {
            setError(undefined);
        }
    }

    const handleSearchResponse = (resp: MarvelApiResponse<Comic>) => {
        setSearching(false);
        if (
            resp?.code !== 200 ||
            !resp.data?.results
        ) { setSuggestions([]); return; }

        const options = resp.data.results.map<DropdownOption>(comic => {
            return {
                label: comic.title || '',
                value: comic.title || '',
                data: comic,
                href: `/comics/${comic.id}`
            }
        })
        setSuggestions(options);
    }

    return (<>
        <section className="section is-size-3 has-text-weight-bold is-family-secondary pb-0">
            <div className="container">
                Comics
            </div>
        </section>
        <section className="section">
            <FilterLayout
                filters={[{
                    label: "Sort by",
                    options: columnOptions,
                    value: sortColumn,
                    onChange: ({ value }) => { setSortColumn(value as ComicOrderByFields) },
                }, {
                    label: "Direction",
                    options: directionOptions,
                    value: sortDirection,
                    onChange: ({ value }) => { setSortDirection(value as OrderDirection); },
                }
                ]}
                searchOptions={{
                    value: searchWord,
                    icon: "search",
                    isLoading: isSearching,
                    suggestions: suggestions,
                    onInput: (v) => { setSearchWord(v); },
                    onEnter: (v) => { setFilterWord(v); setSuggestions([]) },
                }}
            >
                <LoadScreen isLoading={isLoading}>
                    {error ? (
                        <ErrorScreen
                            title={error}
                            onTryAgain={data?.code !== 200 ? loadData : undefined}
                        ></ErrorScreen>
                    ) : (
                        <GridLayout columnSize={{
                            mobile: ColumnSizes.Half,
                            tablet: ColumnSizes.OneThird,
                            desktop: ColumnSizes.OneThird,
                            widescreen: ColumnSizes.OneQuarter
                        }}>
                            {results.map(comic => <ComicCard comic={comic} key={comic.id}></ComicCard>) || null}
                        </GridLayout>
                    )}

                </LoadScreen>
            </FilterLayout>
        </section >
    </>)
}

const ComicCard: FC<{ comic: Comic }> = ({ comic }) => {
    const title = comic.title || ''
    const comicDate = getComicDate(comic.dates);
    const byline = comicDate ? comicDate.toLocaleDateString() : 'no date available'
    const creatorLinks = getCreatorLinks(comic.creators?.items);
    const thumbnail = getThumbnailUrl(comic.thumbnail);

    function getComicDate(dates?: ComicDate[]) {
        if (!dates || !dates.length) { return null; }

        const dateObj = dates.find(date => date.type === 'onsaleDate') || dates[0];

        return dateObj.date ? new Date(dateObj.date) : null;
    }

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

    function getThumbnailUrl(image?: MarvelImage) {
        if (!image || !image.path || !image.extension) {
            return "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_incredible.jpg"
        }

        return `${image.path}/portrait_incredible.${image.extension}`
    }

    return <Card
        title={title}
        byline={byline}
        links={creatorLinks}
        thumbnail={{ src: thumbnail, alt: 'cover image of the comic issue' }}
        useOverlay={true}
        href={`/comics/${comic.id}`}
    ></Card>

}

export default ComicsListPage;