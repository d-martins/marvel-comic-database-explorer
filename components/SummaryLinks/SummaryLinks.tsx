import React, { FC } from "react";
import Link from "next/link";
import { CharacterSummary } from "../../models/character";
import { ComicSummary } from "../../models/comic";
import { CreatorSummary } from "../../models/creators";
import { EventSummary } from "../../models/events";
import { StorySummary } from "../../models/stories"
import styles from './SummaryLinks.module.scss';


const SummaryLinks: FC<{
    summaries: Array<ComicSummary | CreatorSummary | EventSummary | CharacterSummary | StorySummary>
    title?: string
    baseRoute: string
    direction?: 'row' | 'column'
}> = ({ summaries, title, baseRoute, direction = 'column' }) => {
    // if name or url is missing, no point in rendering it
    const useableSummaries = summaries?.filter(summary => {
        return summary.name && summary.resourceURI
    });
    if (!useableSummaries?.length) { return null; }
    // from this point on, TS complains, bue we can be sure the the properties exist

    return (
        <div className={styles["summary-links"]}>
            {title ? (
                <div className="is-size-5 is-capitalized has-text-weight-bold">{title}</div>
            ) : null}
            <div className={`links is-flex is-flex-wrap-wrap is-flex-direction-${direction}`}>
                {useableSummaries.map(summary => {
                    const id = summary.resourceURI?.split('/').pop() || "";
                    return (
                        <Link key={summary.resourceURI} href={`${baseRoute}/${id}`} >
                            <a className="is-underlined mr-2 is-link">{summary.name}</a>
                        </Link>
                    )

                })}
            </div>
        </div>)
}

export default SummaryLinks