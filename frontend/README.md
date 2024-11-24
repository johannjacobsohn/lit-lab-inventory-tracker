Lab Inventory UI
================

This is a small project to display a list of lab devices. Data is fetched from a [backend service](https://github.com/jjacobsohn-eppendorf/lab-inventory-backend)


Getting started
===============

Docker
------

    docker build -t lab-inventory-frontend .
    docker run -p 8081:8081 lab-inventory-frontend

The frontend will be available at `http://localhost:8081/` and expecting the backend on `http://localhost:8080/`

Alternatively, you can use the docker-compose file from [Lab Inventory OPS](https://github.com/jjacobsohn-eppendorf/lab-inventory-ops)

Locally
-------

    pnpm install
    pnpm dev

The frontend will be available at `http://localhost:5173/`

Related projects
================

- [Lab Inventory UI](https://github.com/jjacobsohn-eppendorf/lab-inventory-frontend)

   This project

- [Lab Inventory Backend](https://github.com/jjacobsohn-eppendorf/lab-inventory-backend)

    The backend for this project.
  
- [Lab Inventory OPS](https://github.com/jjacobsohn-eppendorf/lab-inventory-ops)

   Docker compose files related to this project


Challenge
=========

Your challenge is to complete two independent tasks:

- [x] Use the data in the provided data.json file to visualize a sortable table/list of entries
- [x] Create a simple registration form with the following requirements
  - [x] Name Input
    - [x] required
    - [x] at least 2 characters
  - [x] Email Input
    - [x] required
    - [x] simple email validation
  - [x] Password Input
    - [x] required
    - [x] at least 8 characters
    - [x] at least one uppercase letter
    - [x] at least one special character
    - [x] at least one number


TODO
====

- [ ] Add tests
    - [ ] Add unit tests
    - [ ] Add e2e tests
- [ ] Accessibility is not "quite there" yet and needs to be tested
    - [ ] add AXE a11y to pipeline
- [ ] Add a openapi documentation to the backend
- [ ] A lot of bootstrap cleanup is required
- [ ] Improve responsiveness for smartphones
- [ ] Add Storybook
- [ ] _Maybe_ ssr
- [ ] Move all related projects to a monorepo

