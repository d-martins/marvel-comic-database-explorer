import type { GetServerSideProps, NextPage } from 'next'
import { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Comic, ComicDate, ComicFormat, ComicOrderByFields, ComicQueryOptions } from '../../models/comic';
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
import Pagination from '../../components/Pagination/Pagination';
import { useRouter } from 'next/router';
import useMarvelImage from '../../hooks/useMarvelImage';
import useComicDate from '../../hooks/useMarvelDate';

type ServerSideProps = {
    fallbackData?: MarvelApiResponse<Comic> | null
    searchParam?: string
    sortByParam?: ComicOrderByFields
    directionParam?: OrderDirection
    formatParam?: ComicFormat
    pageParam?: number
}

async function getData(query: ComicQueryOptions) {
    const now = new Date();
    const pastDate = new Date(now.getFullYear() - 200, now.getMonth() + 1, now.getDate());
    const dateRange = [pastDate, now]; // don't list upcoming titles

    return await ComicsService.getComicsList({ dateRange, noVariants: true, ...query })
}

const columnOptions: DropdownOption[] = [
    { value: ComicOrderByFields.Title, label: "Title" },
    { value: ComicOrderByFields.IssueNumber, label: "Issue number" },
    { value: ComicOrderByFields.Modified, label: "Last modified" },
    { value: ComicOrderByFields.OnsaleDate, label: "Publishing date" },
    { value: ComicOrderByFields.FocDate, label: "Final order date" },
]
const formatOptions: DropdownOption[] = [
    { value: "", label: "All" },
    { value: ComicFormat.Comic, label: "Comic" },
    { value: ComicFormat.Digest, label: "Digest" },
    { value: ComicFormat.Digital, label: "Digital" },
    { value: ComicFormat.GraphicNovel, label: "Graphic Novel" },
    { value: ComicFormat.Infinite, label: "Infinite" },
    { value: ComicFormat.Magazine, label: "Magazine" },
    { value: ComicFormat.Paperback, label: "Paperback" },
    { value: ComicFormat.Hardcover, label: "Harcover" },

]
const directionOptions: DropdownOption[] = [
    { value: OrderDirection.Ascending, label: "Ascending" },
    { value: OrderDirection.Descending, label: "Descending" },
]

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ query }) => {
    const {
        search = "",
        sortby = ComicOrderByFields.OnsaleDate,
        direction = OrderDirection.Descending,
        page = "0",
        format = ""

    } = query;

    const searchParam = Array.isArray(search) ? search[0] : search;
    const sortByParam = (Array.isArray(sortby) ? sortby[0] : sortby) as ComicOrderByFields;
    const directionParam = (Array.isArray(direction) ? direction[0] : direction) as OrderDirection
    const formatParam = (Array.isArray(format) ? format[0] : format) as ComicFormat
    const pageParam = parseInt(Array.isArray(page) ? page[0] : page)

    // Fetch data from external API
    const res = await getData({
        titleStartsWith: searchParam,
        orderBy: sortByParam,
        orderDirection: directionParam,
        offset: pageParam,
        format: formatParam
    })
    const data = res

    // Pass data to the page via props
    return {
        props: {
            fallbackData: data.code === 200 ? data : null,
            directionParam,
            pageParam,
            searchParam,
            sortByParam,
            formatParam
        }
    }
}

const ComicsListPage: NextPage<ServerSideProps> = ({ fallbackData, directionParam, pageParam, searchParam, sortByParam, formatParam }) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [isSearching, setSearching] = useState(false);
    const [data, setData] = useState<MarvelApiResponse<Comic> | undefined>(fallbackData || undefined)
    const [error, setError] = useState<string>();

    const [suggestions, setSuggestions] = useState<DropdownOption[]>([]);
    const [searchWord, setSearchWord] = useState<string>(searchParam || "");
    const filterWord = useMemo(() => { return searchParam }, [searchParam]);
    const page = useMemo(() => { return pageParam || 0 }, [pageParam])

    const sortColumn = useMemo(() => { return sortByParam || ComicOrderByFields.OnsaleDate }, [sortByParam]);
    const sortDirection = useMemo(() => { return directionParam || OrderDirection.Descending }, [directionParam]);
    const format = useMemo(() => { return formatParam || "" }, [formatParam]);

    const debouncedSearchWord = useDebounce(searchWord, 500);
    const results = data?.data?.results || []

    const query: ComicQueryOptions = useMemo(() => {

        return {
            orderBy: sortColumn,
            orderDirection: sortDirection,
            titleStartsWith: filterWord,
            limit: 20,
            offset: page * 20,
            format: format || undefined
        }
    }, [sortColumn, sortDirection, filterWord, page, format])

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

    useLayoutEffect(() => {
        // TODO: detect IE11 and animate scroll with js
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [page])


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

    const changeRoute = (queryKey: string, queryValue: string, resetPagination?: boolean, replace?: boolean) => {
        if (queryValue) {
            router.query[queryKey] = queryValue
        } else {
            delete router.query[queryKey];
        }
        if (resetPagination) {
            delete router.query["page"];
        }

        if (replace) {
            router.push(router);
        } else {
            router.replace(router);
        }
    }

    return (<>
        <section className="section is-size-3 has-text-weight-bold is-family-secondary pb-0">
            <div className="container">
                Comics
            </div>
        </section>
        <section className="section">
            <FilterLayout
                filters={[
                    {
                        label: "Format",
                        options: formatOptions,
                        value: format,
                        onChange: ({ value }) => { changeRoute('format', value.toString(), true) },
                    },
                    {
                        label: "Sort by",
                        options: columnOptions,
                        value: sortColumn,
                        onChange: ({ value }) => { changeRoute('sortby', value.toString(), true) },
                    },
                    {
                        label: "Direction",
                        options: directionOptions,
                        value: sortDirection,
                        onChange: ({ value }) => { changeRoute('direction', value.toString(), true) },
                    }
                ]}
                searchOptions={{
                    value: searchWord,
                    icon: "search",
                    isLoading: isSearching,
                    suggestions: suggestions,
                    onInput: (v) => { setSearchWord(v); },
                    onEnter: (v) => { changeRoute('search', v, true); setSuggestions([]) },
                }}
            >
                <LoadScreen isLoading={isLoading && !data}>
                    {error ? (
                        <ErrorScreen
                            title={error}
                            onTryAgain={data?.code !== 200 ? loadData : undefined}
                        ></ErrorScreen>
                    ) : (
                        <>
                            <GridLayout columnSize={{
                                mobile: ColumnSizes.Half,
                                tablet: ColumnSizes.OneThird,
                                desktop: ColumnSizes.OneThird,
                                widescreen: ColumnSizes.OneQuarter
                            }}>
                                {results.map(comic => <ComicCard comic={comic} key={comic.id}></ComicCard>) || null}
                            </GridLayout>

                            {isLoading ? (
                                <div className="is-overlay is-fade-in-out has-background-light"></div>
                            ) : null}
                        </>
                    )}
                </LoadScreen>
            </FilterLayout>
            {data ? (
                <section className="section pt-0">
                    <div className="container">
                        <Pagination
                            currentPage={page}
                            pageSize={20}
                            totalItems={data?.data?.total || results.length}
                            navigate={true}
                        ></Pagination>
                    </div>
                </section>
            ) : null}
        </section >
    </>)
}

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