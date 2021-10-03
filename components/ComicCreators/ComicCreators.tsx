import React, { FC } from "react";
import { Comic } from "../../models/comic";
import { CreatorSummary } from "../../models/creators";
import SummaryLinks from "../SummaryLinks/SummaryLinks";

const ComicCreators: FC<{ comic?: Comic }> = ({ comic }) => {
    const creators = comic?.creators?.items;
    const useableCreators = creators?.filter(creator => {
        return creator.name && creator.resourceURI && creator.role
    });
    // from this point on, we know all creators have all 3 attributes
    if (!useableCreators?.length) { return null; }

    const creatorMap: { [role: string]: CreatorSummary[] } = {}
    // separate users by role
    useableCreators.forEach((creator) => {
        const role = creator.role || '_';
        const roleCollection = creatorMap[role] = creatorMap[role] || [];

        roleCollection.push(creator);
    })
    const roles = Object.keys(creatorMap);

    return (
        <div className="columns is-multiline">
            {roles.map((role) => {
                return (
                    <div key={role} className="column is-one-third">
                        < div className="mb-2" >
                            <SummaryLinks
                                summaries={creatorMap[role]}
                                title={role}
                                baseRoute="/creators"
                                key={role}
                                direction={"row"}
                            ></SummaryLinks>
                        </div>
                    </div>
                )
            })}
        </div >
    )
}

export default ComicCreators;