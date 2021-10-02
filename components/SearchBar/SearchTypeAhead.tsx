

import { FC } from "react";
import Dropdown, { DropdownOption } from '../Dropdown/Dropdown'
import SearchBar, { SearchBarProps } from "./SearchBar";
import styles from './SearchTypeAhead.module.scss';

export type SearchTypeAheadProps = SearchBarProps & {
    suggestions?: DropdownOption[];
}

const SearchTypeAhead: FC<SearchTypeAheadProps> = ({
    suggestions,
    value,
    onInput,
    ...props
}) => {

    const handleSuggestionsClick = (option: DropdownOption) => {
        if (!option.href) {
            onInput(option.value.toString());
        }
    }

    return (
        <div className={styles["search-bar"]}>
            <Dropdown
                options={suggestions || []}
                value={value}
                label=""
                onChange={handleSuggestionsClick}
            >
                <SearchBar
                    onInput={onInput}
                    value={value}
                    {...props}
                ></SearchBar>
            </Dropdown>
        </div>
    )
}

export default SearchTypeAhead;
