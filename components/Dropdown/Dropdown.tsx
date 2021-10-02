import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from './Dropdown.module.scss';

export type DropdownOption = {
    label: string;
    value: string | number;
    href?: string;
    data?: any;
}

export type DropdownProps = {
    label: string;
    value: DropdownOption["value"];
    options: DropdownOption[];
    onChange?: (option: DropdownOption) => void
}

const Dropdown: FC<DropdownProps> = ({ label, value, options, onChange }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(o => o.value === value);
    const arrowClass = isOpen ? 'arrow_drop_up' : 'arrow_drop_down';

    // Effect for detecting ouside clicks that close the dropdown
    useEffect(() => {
        // named function so the event can be removed during cleanup
        const checkIfOutsideClick = (e: MouseEvent) => {
            if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
                closeDropdown();
            }
        }

        document.addEventListener('click', checkIfOutsideClick);
        return () => {
            document.removeEventListener('click', checkIfOutsideClick);
        }
    }, [isOpen])

    const closeDropdown = () => {
        setOpen(false);
    }

    const toggleDropdown = () => {
        setOpen(!isOpen);
    }

    const handleItemClick = (option: DropdownOption) => {
        closeDropdown();

        if (typeof onChange === 'function') {
            onChange(option);
        }
    }

    return (
        <div className={`dropdown ${isOpen ? ' is-active' : ''} ${styles['custom-dropdown']}`} ref={ref}>
            <div className="dropdown-trigger" onClick={toggleDropdown}>
                <button className="button has-border-0">
                    {label ? (
                        <span className="has-text-weight-bold mr-2">{label}{selectedOption ? ':' : ''}</span>
                    ) : null}
                    {selectedOption ? (
                        <span>{selectedOption.label}</span>
                    ) : null}
                    {!label && !selectedOption ? (
                        <span>No selection</span>
                    ) : null}
                    <span className="material-icons">{arrowClass}</span>
                </button>
            </div>
            <div className="dropdown-menu">
                <div className="dropdown-content">
                    {options.map(option => {
                        const activeClass = option === selectedOption ? 'is-active' : '';
                        const item = (
                            <div
                                key={option.value}
                                className={`dropdown-item is-clickable ${activeClass}`}
                                onClick={() => handleItemClick(option)}
                            >
                                {option.label}
                            </div>
                        );
                        return option.href ? <Link href={option.href}><a>{item}</a></Link> : item;
                    })}

                </div>
            </div>
        </div>
    );
}

export default Dropdown;