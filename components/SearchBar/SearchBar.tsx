import { FC } from "react";

export type SearchBarProps = {
    value: string,
    onInput: (value: string) => void,
    onEnter?: (value: string) => void
    placeholder?: string
    isLoading?: boolean
    icon?: string;
}

const SearchBar: FC<SearchBarProps> = ({
    value,
    onInput,
    onEnter,
    placeholder = "Start typing for results",
    isLoading = false,
    icon = "",
}) => {
    return (
        <div className={`control ${icon ? 'has-icons-right' : ''} ${isLoading ? 'is-loading' : ''}`}>
            <input
                value={value}
                className={`input is-rounded`}
                type="text"
                placeholder={placeholder}
                onChange={(e) => onInput(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && onEnter && onEnter(value)}
            >
            </input>
            {icon && !isLoading ? (
                <span className="icon is-right is-clickable" onClick={() => onEnter && onEnter(value)}>
                    <span className="material-icons">{icon}</span>
                </span>
            ) : null}
        </div>
    )
}

export default SearchBar;
