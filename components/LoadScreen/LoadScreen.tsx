import { FC } from "react"
import Error from 'next/error'
import styles from './LoadScreen.module.scss';
import ErrorScreen from "../ErrorScreen/ErrorScreen";

type LoadScreenProps = {
    isLoading: boolean;
    loaderSize?: 'xsmall' | 'small' | 'medium' | 'large';
}

const LoadScreen: FC<LoadScreenProps> = ({ children, isLoading, loaderSize = "medium" }) => {

    if (isLoading) {
        return (
            <div className={styles["load-screen"]}>
                <span className={`button is-loading is-${loaderSize}`}></span>
            </div>
        )
    }
    return <>{children}</>;

}

export default LoadScreen;