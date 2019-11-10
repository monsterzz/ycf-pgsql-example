# Yandex Cloud Functions : Working with DB

## Build package

Small example which shows how to bundle NodeJS dependencies
and connect to PostgreSQL database.

To build deployment package (`dist.zip`):

    $ make

or, if you prefer to use `npm`:

    $ npm run build

## Create PostgreSQL database

Before we start deploying, we need to create PostgreSQL database
and obtain it's connection parameters. Easiest way is to use web-console.

**Don't forget**:
* make your database available using public IP address;
* use strong passwords.

## Deploy function

To deploy your function:

    $ yc serverless function create --name pgconn
    $ yc serverless function version create   \
          --function-name pgconn              \
          --runtime nodejs12                  \
          --entrypoint index.handler          \
          --memory 128M                       \
          --execution-timeout 1s              \
          --source-path dist.zip              \
          --environment PGHOST=X.X.X.X        \
          --environment PGPORT=XXXX           \
          --environment PGUSER=xxx-username   \
          --environment PGPASSWORD=xxx-passw  \
          --environment PGDATABASE=xxx-dbname

Used environment variables:

* `PGHOST` – IP Address;
* `PGPORT` – Database Port;
* `PGDATABASE` – Database Name;
* `PGUSER` – Database Username;
* `PGPASSWORD` – Database Password.

## Test it

    $ yc serverless function invoke --name pgconn
    {"dbTime":"2019-11-10T21:55:51.363Z"}