import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import { Comic, ComicOrderByFields } from '../../models/comic';
import { MarvelApiResponse, OrderDirection } from '../../models/marvelApi';
import { ComicsService } from '../../services/marvel-api';
import Card from '../../components/Card/Card';
import Error from 'next/error'
import GridLayout from '../../components/GridLayout/GridLayout';
import { ColumnSizes } from '../../models/bulma';
import Dropdown, { DropdownOption, DropdownProps } from '../../components/Dropdown/Dropdown';
import useDebounce from '../../hooks/useDebounce';
import SearchTypeAhead from '../../components/SearchBar/SearchTypeAhead';

const ComicsListPage: NextPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [isSearching, setSearching] = useState(false);
    const [data, setData] = useState<MarvelApiResponse<Comic> | undefined>(undefined)
    const [sortColumn, setSortColumn] = useState<ComicOrderByFields>(ComicOrderByFields.OnsaleDate);
    const [sortDirection, setSortDirection] = useState<OrderDirection>(OrderDirection.Descending);
    const [searchWord, setSearchWord] = useState<string>("");
    const [filterWord, setFilterWord] = useState<string>("");
    const [suggestions, setSuggestions] = useState<DropdownOption[]>([]);

    const debouncedSearchWord = useDebounce(searchWord, 500);

    useEffect(() => {
        const now = new Date();
        const pastDate = new Date(now.getFullYear() - 200, now.getMonth() + 1, now.getDate());

        ComicsService.getComicsList({
            dateRange: [pastDate, now], // don't list upcoming titles
            orderBy: sortColumn,
            orderDirection: sortDirection,
            titleStartsWith: filterWord
        }).then(handleResponse)
    }, [sortColumn, sortDirection, filterWord])

    useEffect(() => {
        if (!debouncedSearchWord) {
            setSuggestions([]);
            return;
        }

        setSearching(true);

        ComicsService.getComicsList({
            titleStartsWith: debouncedSearchWord
        }).then(handleSearchResponse)
    }, [debouncedSearchWord])

    const handleResponse = (resp: MarvelApiResponse<Comic>) => {
        setData(resp);
        setLoading(false);
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

    if (isLoading) { return <span>loading...</span>; }

    if (data?.code !== 200) {
        return <Error statusCode={data?.code || 500} title={data?.status}></Error>
    }

    const results = data.data?.results || [{}]

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

    const onOptionSelected = (option: DropdownOption) => {
        setSortColumn(option.value as ComicOrderByFields);
    }
    const onDirectionOptionSelected = (option: DropdownOption) => {
        setSortDirection(option.value as OrderDirection);
    }

    // ✔ add state for selected sort column
    // ✔ add state for sort direction
    // add state for search word
    // add state for search suggestions (or pass a function that renders them to the search component)

    // create useDebounce hook
    // create component for search
    // ✔ create component for sort
    // create component for filtering controls

    // put it all together with useEffect hooks to update data
    // create loading component
    // create re-loading component
    // test errors

    return (
        <section className="section">

            <div className="container">
                <div className="columns">
                    <div className="column">
                        <SearchTypeAhead
                            value={searchWord}
                            icon="search"
                            isLoading={isSearching}
                            suggestions={suggestions}
                            onInput={(v) => { setSearchWord(v); }}
                            onEnter={(v) => { setFilterWord(v); setSuggestions([]) }}
                        ></SearchTypeAhead></div>
                    <div className="column">
                        <Dropdown
                            label="Sort by"
                            options={columnOptions}
                            value={sortColumn}
                            onChange={onOptionSelected}
                        ></Dropdown>
                        <Dropdown
                            label="Direction"
                            options={directionOptions}
                            value={sortDirection}
                            onChange={onDirectionOptionSelected}
                        ></Dropdown>
                    </div>
                </div>
                <GridLayout columnSize={{
                    mobile: ColumnSizes.Half,
                    tablet: ColumnSizes.Half,
                    desktop: ColumnSizes.OneThird,
                    widescreen: ColumnSizes.OneQuarter
                }}>
                    {results.map(comic => {
                        const creators = comic.creators?.items.filter(creator => creator.name && creator.resourceURI) || [];
                        const creatorLinks = creators.map(creator => {
                            return {
                                label: creator.name || '',
                                href: `/creators/${creator.resourceURI?.split('/').pop()}`
                            }
                        })

                        return <Card
                            key={comic.id}
                            title={comic.title || ""}
                            byline={comic.dates?.find(date => date.type === 'onsaleDate')?.date?.toString() || ""}
                            links={creatorLinks}
                            thumbnail={{ src: `${comic.thumbnail?.path}/portrait_incredible.${comic.thumbnail?.extension}`, alt: "cover image of the comic book" }}
                            useOverlay={true}
                            href={`/comics/${comic.id}`}
                        ></Card>
                    }) || null}
                </GridLayout>
            </div>
        </section>)


}

export default ComicsListPage;