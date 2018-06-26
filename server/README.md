# deardiiary-backend

Dear Diiary API

## Copy/create .env config

    cp .env.config .env

Now update .env with your own changes

## Setup MongoDB (using an mlab instance from Azure provider)

-   Username: `deardiiary_user`
-   Password: Ask me

Change `CHANGEME` the `.env` file.
You can use `MONGODB_URI` or `MONGOLAB_URI` environment variables.

Or create your own account at mlab and update the environment variables from `.env`.

## Install It

    yarn install

## Run It

#### Run in _development_ mode:

    yarn run dev

#### Run in _production_ mode:

    yarn start

#### Run tests:

    yarn test

### Try It

-   Point you're browser to <http://localhost:3000>
-   Invoke the example REST endpoint `curl http://localhost:3000/users`

