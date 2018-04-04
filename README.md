cinemas-base is a test task for Node JS Developer position.

## Installation

```shell
git clone https://github.com/NataliiaZhurbenko/cinemas-base.git
cd cinemas-base.git
npm install
```

## Testing

First start the server:

```shell
npm start
```

Then you can test endpoints via cURL:

* Add a new cinema

```shell
curl -X POST -H "Content-Type: application/json" -d '{"name": "cinema name", "city": "cinema city"}' http://localhost:3000/cinemas
```

* Add a new hall

```shell
curl -X POST -H "Content-Type: application/json" -d '{"name": "hall name", "capacity": number, "cinema": "cinema ID"}' http://localhost:3000/halls
```

* Add a new film

```shell
curl -X POST -H "Content-Type: application/json" -d '{"name": "film name", "year": number, "duration": number}' http://localhost:3000/films
```

* Add a new show

```shell
curl -X POST -H "Content-Type: application/json" -d '{"startAt": "date and time", "film": "film ID", "hall": "hall ID"}' http://localhost:3000/shows
```

* Get a list of cinemas

```shell
curl -X GET http://localhost:3000/cinemas
```

* Get a list of halls by cinemas

```shell
curl -X GET http://localhost:3000/halls?cinema=cinema-ID
```

* Get a list of films

```shell
curl -X GET http://localhost:3000/films
```

* Get a list of shows by dates, halls, cinemas

```shell
curl -X GET http://localhost:3000/shows?date="date of show, e.g. 2018-04-04"&hall=hall-ID&cinema=cinema-ID
```

