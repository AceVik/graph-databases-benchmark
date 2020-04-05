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


### Example
```
[2020-04-05 22:38:21.06] Measure "generate test data"
[2020-04-05 22:38:21.23] ✓ "generate test data" finished in 0:0:0.170
[2020-04-05 22:38:21.24] Start benchmark "ArangoDB"
[2020-04-05 22:38:21.24]        Measure "Create a new database"
[2020-04-05 22:38:21.27]        ✓ "Create a new database" finished in 0:0:0.24
[2020-04-05 22:38:21.27]        Measure "Create data containers"
[2020-04-05 22:38:21.28]        ✓ "Create data containers" finished in 0:0:0.8
[2020-04-05 22:38:21.29]        Measure "Insert accounts"
[2020-04-05 22:38:21.36]        Measure "Insert addresses"
[2020-04-05 22:38:24.42]        ✓ "Insert accounts" finished in 0:0:3.128
[2020-04-05 22:38:28.74]        ✓ "Insert addresses" finished in 0:0:7.375
[2020-04-05 22:38:28.74]        Measure "Insert profiles"
[2020-04-05 22:38:31.69]        ✓ "Insert profiles" finished in 0:0:2.956
[2020-04-05 22:38:31.69]        Measure "Insert relations"
[2020-04-05 22:38:46.83]        ✓ "Insert relations" finished in 0:0:15.134
[2020-04-05 22:38:46.83]        Measure "Drop created database"
[2020-04-05 22:38:46.84]        ✓ "Drop created database" finished in 0:0:0.14
[2020-04-05 22:38:46.84] Benchmark "ArangoDB" finished in 0:0:25.608
[2020-04-05 22:38:46.84] Start benchmark "OrientDB"
[2020-04-05 22:38:46.89]        Measure "Create a new database"
[2020-04-05 22:38:48.71]        ✓ "Create a new database" finished in 0:0:1.817
[2020-04-05 22:38:48.73]        Measure "Create data containers"
[2020-04-05 22:38:49.44]        ✓ "Create data containers" finished in 0:0:0.709
[2020-04-05 22:38:49.44]        Measure "Insert accounts"
[2020-04-05 22:38:49.65]        Measure "Insert addresses"
[2020-04-05 22:38:52.30]        ✓ "Insert accounts" finished in 0:0:2.859
[2020-04-05 22:38:55.91]        ✓ "Insert addresses" finished in 0:0:6.259
[2020-04-05 22:38:55.91]        Measure "Insert profiles"
[2020-04-05 22:38:58.89]        ✓ "Insert profiles" finished in 0:0:2.982
[2020-04-05 22:38:58.90]        Measure "Insert relations"
[2020-04-05 22:39:22.56]        ✓ "Insert relations" finished in 0:0:23.666
[2020-04-05 22:39:22.56]        Measure "Drop created database"
[2020-04-05 22:39:23.40]        ✓ "Drop created database" finished in 0:0:0.841
[2020-04-05 22:39:23.41] Benchmark "OrientDB" finished in 0:0:36.551
┌──────────────────────────┬───────────────────────┬────────────────────────┬─────────────────┬──────────────────┬─────────────────┬──────────────────┬───────────────────────┐
│         (index)          │ Create a new database │ Create data containers │ Insert accounts │ Insert addresses │ Insert profiles │ Insert relations │ Drop created database │
├──────────────────────────┼───────────────────────┼────────────────────────┼─────────────────┼──────────────────┼─────────────────┼──────────────────┼───────────────────────┤
│ ArangoDB (0:0:25.608 ms) │     '0:0:0.24 ms'     │      '0:0:0.8 ms'      │ '0:0:3.128 ms'  │  '0:0:7.375 ms'  │ '0:0:2.956 ms'  │ '0:0:15.134 ms'  │     '0:0:0.14 ms'     │
│ OrientDB (0:0:36.551 ms) │    '0:0:1.817 ms'     │     '0:0:0.709 ms'     │ '0:0:2.859 ms'  │  '0:0:6.259 ms'  │ '0:0:2.982 ms'  │ '0:0:23.666 ms'  │    '0:0:0.841 ms'     │
└──────────────────────────┴───────────────────────┴────────────────────────┴─────────────────┴──────────────────┴─────────────────┴──────────────────┴───────────────────────┘
Done in 64.95s.
```