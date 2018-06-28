# deardiiary-backend

Dear Diiary API

## Instal yarn

    npm install --global yarn

or

Follow [this][install] for more ways to install it

[install]: https://yarnpkg.com/en/docs/install

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
-   Invoke the users REST endpoint `curl http://localhost:3000/api/v1/users`

## On the cloud

### Zeit/Now

-   Go to zeit.co and create and account.
-   Download Desktop Now and install.
-   Execute `now login` follow the prompt.
-   Execute `now secrets add mongolab-uri "mongodb://CHANGEME_USERNAME:PASSWORD_CHANGEME@ds018308.mlab.com:18308/deardiiary"`
-   Execute `now secrets add deardiiary-secret "YOUR_SECRET"`
-   Update `now.json` file if you need to.
-   Execute `now --public` since using the free OSS, it will prompt a warning, passing `--public` the warning goes away.
-   Point you're browser to <https://deardiiary-backend-aurvyseuqs.now.sh> this is the one I deployed for testing.
-   Invoke the users REST endpoint `curl https://deardiiary-backend-aurvyseuqs.now.sh/api/v1/users`
