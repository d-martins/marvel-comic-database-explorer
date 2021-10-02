import { FC, ReactNode } from "react"
import Dropdown, { DropdownProps } from "../Dropdown/Dropdown";
import SearchTypeAhead, { SearchTypeAheadProps } from "../SearchBar/SearchTypeAhead";
import styles from './FilterLayout.module.scss';


export type FilterLayoutProps = {
    filters: DropdownProps[]
    searchOptions: SearchTypeAheadProps
}

const FilterLayout: FC<FilterLayoutProps> = ({ children, searchOptions, filters }) => {

    return (
        <div className={`container ${styles["filter-layout"]}`}>
            <div className="filter-zones is-flex-tablet is-justify-content-space-between" >
                <div className="search-zone flex-shrink is-fullwidth">
                    <SearchTypeAhead {...searchOptions}></SearchTypeAhead>
                </div>
                <div className="filters-zone flex-grow">
                    {filters.map((filterProps) => {
                        return <Dropdown {...filterProps} key={filterProps.label}></Dropdown>
                    })}
                </div>
            </div>
            <div className="content-zone is-relative">
                {children}
            </div>
        </div>
    );
}

export default FilterLayout