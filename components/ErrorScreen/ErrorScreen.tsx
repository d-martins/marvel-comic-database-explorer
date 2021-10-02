import { FC } from "react"
import styles from "./ErrorScreen.module.scss";

type ErrorScreenProps = {
    title: string;
    onTryAgain?: () => void;
}

const ErrorScreen: FC<ErrorScreenProps> = ({ title, onTryAgain }) => {
    return (
        <div className={`${styles['error-screen']} section`}>
            <div className="is-size-3">{title}</div>
            {onTryAgain ? (
                <div className="action">
                    Please <a onClick={onTryAgain}>try again</a> in a few seconds
                </div>
            ) : null}
        </div>
    );
}

export default ErrorScreen;