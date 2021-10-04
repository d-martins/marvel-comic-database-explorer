# marvel-comic-database-explorer
Small SPA for displaying content form Marvel's developer API

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Link to the application [here](https://marvel-comic-database-explorer.herokuapp.com/comics)

## Local configuration

1. Get an API key from [Marvel's dev portal](https://developer.marvel.com/account) if you haven't already
2. Create an `env.local` file at the project root. Open it.
3. Add the follwoing lines to the file
    ```
    NEXT_PUBLIC_API_KEY=<your_public_key>`
    PRIVATE_API_KEY=<your_private_key>`
    ```
4. Make sure you have the project dependencies installed by running.
    ```bash
    npm install
    #or
    yarn install
    ```
The project was created and built using `12.21.0`. 


## Run the development server:
1. Make sure you followed the local configuration steps
2. run the development server
    ```bash
    npm run dev
    # or
    yarn dev
    ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODOS
Improvements that still can be done in the app

- finish home page: load 3 recent comics
- fix server side rendering double calls and slow navigation
- add service-worker
- add server-side-cache (decrease calls to API to avoid throttling)
- add paralax the hero components
- make use of the blurDataURL in the `<Image>` components
- finish more pages other than comics

[wireframes](https://www.figma.com/proto/o7mxFjPW4ZQtsFVy9b6Xvt/Marvel-Database-Explorer?page-id=3%3A5&node-id=4%3A15&viewport=343%2C48%2C0.7&scaling=scale-down&starting-point-node-id=4%3A15)
