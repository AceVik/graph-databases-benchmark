@echo off

docker run -d --name arangodb -p 8529:8529 -e ARANGO_ROOT_PASSWORD=graphdbbenchmark arangodb:latest
docker run -d --name orientdb -p 2424:2424 -p 2480:2480 -e ORIENTDB_ROOT_PASSWORD=graphdbbenchmark orientdb:latest