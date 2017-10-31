# We.js project inside docker container

## Installation

### 1- Clone this project ...

### 2- Install project dependency:
```sh
cd server/site
npm install
```

### 3- Start the docker compose containers:
In root folder of this project:
```sh
docker-compose up -d
```

## Services

```
- client
- - app (main app)
- server
- - site 5400
- database (mysql)
- session service (redis)

configurations.json
README.md
```
