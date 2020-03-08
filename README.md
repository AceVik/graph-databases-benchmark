# graph-databases-benchmark
JS benchmark of popular graph databases. (At first ArangoDB and OrientDB)

### WARNING: This project is **work in progress**!

## Requirements
- Running and accessible `ArangoDB` and `OrientDB` service
  - You can use `Docker` to start `ArangoDB` and `OrientDB` service in docker containers
    - Linux/Mac: `./docker-up.sh` 
    - Windows: `.\docker-up.bat`

- `yarn` and `Node`
  * Initialize the project with `yarn install` after checkout
  - Use `yarn start` to start the benchmarks
  - Use `yarn test` to run tests