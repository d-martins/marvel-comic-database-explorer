// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Main, NextScript, Head } from 'next/document';


class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Material+Icons&family=Open+Sans&family=Red+Hat+Display:wght@400;500;700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main></Main>
                    <NextScript></NextScript>
                </body>
            </Html>
        )
    }
}

export default MyDocument;