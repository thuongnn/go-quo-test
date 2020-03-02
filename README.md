# Implement Distributed memory cache service
Demo get data from Github by username.

## How to use?

1. Download or clone this repo.
2. Run with Docker Compose.
```shell script
docker-compose up -d --build
```
3. Access to Server1 or Server2 to retrieve data from Github.

Service1: http://localhost:8080/repos/thuongnn

Service2: http://localhost:8081/repos/thuongnn

## Explanation

The first time the user name data is called, the data is placed in the redis cache. The second time retrieving data on any service, the data will be retrieved from the redis cache if it exists.