# CRUD Manager

## Installation

```
yarn install
yarn dev run
```

## Overview

* I made the authentication flow with a JWT being provided by GitHub working with Next Auth. Behaviour: On first signin
  a user will be created in CRUD Manager with the name, email and image from GitHub account. While having a session the
  username and photo will appear in the top right corner. From there the user can check his session data and logout. I
  was unable to make an API MOCK in time.
* There is an actual fully working RESTful endpoint that is very easy to extend for other potential entities. I created
  another entity, the *Option*, to have an entry for the Spread that is displayed affecting the BTC/USD price feed on
  the header of the app. I attempted to version the API at first, that is why the RESTful stuff is under the "v1"
  folder, but Next Auth wasn't cooperating so I gave up.
* I was not so successful in creating a frontend form system as modular as this RESTful API, so I ended having the forms
  and pagination for the User and Option entities being exact mirrors - the plan was to somehow not have hardcoded forms
  and merge this two mirrors into a single abstraction but there was no time.
* The BTC/USD price feed with spread on top of the app was implemented with the npm package *node-kraken-api* and
  SocketIO. As the order book update comes a local copy of the average price is kept with the applied spread. Then in a
  heartbeat fashion the price value is emitted to the frontend. For some reason my socketIO connection kept being
  downgraded to polling but SocketIO always guaranteed message delivery with the price updates.
* Minimal amount of tests but they work.
* There are docker files but I didn't spend much time on it.
* The exported Postman collection should work and has sample requests for GET, PUT, POST, PATCH and DELETE calls.
* No lint warnings
* Documentation folder
    * Typedoc
    * Postman collection
    * SQLite database dump

## Areas of improvement

*

## Create database tables

```
npx prisma db push
```

## Edit database contents

```
npx prisma studio
```

## Update Prisma client

```
npx prisma generate
```