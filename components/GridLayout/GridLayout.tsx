import { Children, FC, Key, ReactNode } from "react";
import { BreakPoints, ColumnSizes } from "../../models/bulma";

type GridLayoutProps = {
    columnSize: ColumnSizes | { [key in keyof typeof BreakPoints]?: ColumnSizes }
}

const GridLayout: FC<GridLayoutProps> = ({ children, columnSize }) => {

    function calcColumnClassName(): string {
        if (typeof columnSize === 'string') {
            return `is-${columnSize}`
        }

        const classes: string[] = [];
        for (const breakPoint in columnSize) {
            const size = columnSize[breakPoint as keyof typeof columnSize];

            classes.push(`is-${size}-${breakPoint}`)
        }

        return classes.join(' ');
    }

    return (
        <div className="columns is-multiline is-mobile">
            {Children.toArray(children).map((child, i) => {
                let key: Key = i;

                if (typeof child === 'object' && child && 'props' in child) {
                    key = child.key || key
                }

                return (
                    <div className={`column ${calcColumnClassName()}`} key={key}>
                        {child}
                    </div>
                )
            })}
        </div>
    )
}

export default GridLayout;