🔥🔬 LIT - Lab Inventory Tracker Backend
================

This is a small project to read and save inventory data to a mongo database and provide a REST API to access it.
Data can be consumed in the a [frontend](../frontend).


Getting started
===============

Run Docker
----------

    pnpm run docker-build
    pnpm run docker-run

The backend will be available at `http://localhost:8081/` and expecting a mongodb on `mongodb://localhost:27017`

Alternatively, you can use [the docker-compose file](../docker-compose.yml) in the root of this project to start both the frontend and the backend.

Run locally
-----------

    pnpm install
    pnpm dev

The backend will be available at `http://localhost:8081/`


Environment variables
---------------------

| Key           | Required | Default                   | Description                      |
|---------------|----------|---------------------------|----------------------------------|
| PORT          | no       | 8081                      | Port on which the server listens |
| MONGO_URL     | no       | mongodb://localhost:27017 | URL to the mongo database        |
| MONGO_DB_NAME | no       | mydb                      | Name of the database             |

API endpoints
-------------

__REST:__
- GET `/devices/` - list devices
- GET `/devices/:id` - get one device by id
- POST `/devices/` - create a new device
- PUT `/devices/:id` - update a device
- DELETE `/devices` - delete all devices
- DELETE `/devices?id=1,2,3` - delete multiple devices
- DELETE `/devices/:id` - delete a device

__Debugging:__
- GET `/create-dummy-data` - create dummy data
