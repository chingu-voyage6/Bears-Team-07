# deardiiary-backend

Dear Diiary API

## Copy/create .env config

```
cp .env.config .env
```
Now update .env with your own changes

## Setup MongoDB (using an mlab instance from Azure provider)

- Username: `deardiiary_user`
- Password: Ask me

Change `CHANGEME` from the `.env` file.
You can use `MONGODB_URI` or `MONGOLAB_URI` environment variables.

## Install It

```
yarn install
```

## Run It
#### Run in *development* mode:

```
yarn run dev
```

#### Run in *production* mode:

```
yarn run compile
yarn start
```

#### Run tests:

```
yarn test
```

#### Deploy to the Cloud
e.g. CloudFoundry

```
cf push deardiiary-backend
```

### Try It
* Point you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the example REST endpoint `curl http://localhost:3000/api/v1/users`
