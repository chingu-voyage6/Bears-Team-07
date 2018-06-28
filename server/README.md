# deardiiary-backend

Dear Diiary API

## Copy/create .env config
```
cp .env.config .env
```
Now update .env with your own changes

## Install It
```
npm install
```

## Run It
#### Run in *development* mode:

```
npm run dev
```

#### Run in *production* mode:

```
npm run compile
npm start
```

#### Run tests:

```
npm test
```

#### Deploy to the Cloud
e.g. CloudFoundry

```
cf push deardiiary-backend
```

### Try It
* Point you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the example REST endpoint `curl http://localhost:3000/api/v1/examples`
   
