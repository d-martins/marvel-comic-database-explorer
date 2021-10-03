import React, { FC } from "react"
import { Comic } from "../../models/comic"
import SummaryLinks from "../SummaryLinks/SummaryLinks"


const ComicSummaryFooter: FC<{ comic?: Comic }> = ({ comic }) => {

    const characterSummary = comic?.characters?.items?.length ? <SummaryLinks
        title="Characters"
        baseRoute="/characters"
        summaries={comic.characters.items}
        direction="row"
    ></SummaryLinks> : null

    const storiesSummary = comic?.stories?.items?.length ? <SummaryLinks
        title="Stories"
        baseRoute="/stories"
        summaries={comic.stories.items}
    ></SummaryLinks> : null

    const eventsSummary = comic?.events?.items?.length ? <SummaryLinks
        title="Events"
        baseRoute="/events"
        summaries={comic.events.items}
    ></SummaryLinks> : null

    const variantsSummary = comic?.variants?.length ? <SummaryLinks
        title="Variants"
        baseRoute="/comics"
        summaries={comic.variants}
    ></SummaryLinks> : null

    const summaries = [
        characterSummary,
        eventsSummary,
        storiesSummary,
        variantsSummary
    ]

    return (
        <section className="section has-background-light">
            <div className="container">
                <div className="columns is- multiline">
                    {summaries.filter(summary => summary !== null).map((summary, i) => {
                        return (
                            <div key={i} className="column is-one-quarter">
                                {summary}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ComicSummaryFooter;