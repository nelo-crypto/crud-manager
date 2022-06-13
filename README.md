# CRUD Manager

## Notes

* There are two initial interchangeable APIs with equal request and response signatures:
    * Mock (static responses)
    * v1 (interacts with SQLite + Prisma)
        * There is no fixed entity endpoints, as long as the Prisma schema object exists
        * Supports PATCH partial updates

  To change APIs update the value in configuration, `crudmanager.config.json`, property `apiVersion`, either `v1`
  or `mock`.
* Authentication
    * Implemented with *Next Auth*
    * JWT provided by only one provider, GitHub, for simplicity.
    * Working behaviour: On first signin a user will be created in CRUD Manager with the name, email and image from GitHub account. For now the
      user's role is going to be *ADMIN* by default, as to make the demo work out of the gate. But in normal operation it
      should be *USER* as to not have access to the actual CRUD Pages. That condition check is in place.
* Documentation folder
    * Typedoc
    * Postman collection
    * SQLite database dump

## Installation

### With Docker (PORT 3000)

```
sudo docker-compose up
```

### Local (PORT 3000)

```
yarn install
yarn dev run
```

Best case scenario everything works on both approaches.

## Todo

* More JEST tests
* Unify/merge CRUD forms into a single abstraction
* Make mock API
* Check Formik, Yup and SWR
* Postman
    * Make tests
    * Implement version slug

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