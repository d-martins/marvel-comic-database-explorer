import { FC } from "react"
import Image from "next/image"


export type InProgressProps = {

}

const InProgress: FC<InProgressProps> = ({ }) => {

    return (
        <section className="section">
            <div className="container has-text-centered">
                <Image src="/wip.svg" alt="a monochrome man drawing" width="100" height="40" layout={"responsive"} objectFit={"contain"}></Image>
                <p className="is-size-5 mb-2">This page is a work in progress.</p>
                <p className="is-size-6"> Please come back at a later date.</p>
            </div>
        </section>
    )
}

export default InProgress;