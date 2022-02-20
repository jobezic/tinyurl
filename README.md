# Tinyurl
This project is based on implementing a service to shorter an url (like bit.ly).

The project is implemented using NodeJs and MongoDB.

## How to use it
You can get a shorter link by using this api:

```
POST /api/tinify

{"originalUrl": "https://<your_site>"}
```
the body of the request should in **JSON** format.

Example:
```
POST http://localhost:3000/api/tinify

{"originalUrl": "http://www.elpais.es"}
```

Example of the response:

```
{
    "_id": "62124c0f689e9b95e6c3a0df",
    "urlId": "AwMcA4hQR",
    "originalUrl": "http://www.elpais.es",
    "tinyUrl": "http://localhost:3000/AwMcA4hQR",
    "date": "Sun Feb 20 2022 14:11:27 GMT+0000 (Coordinated Universal Time)",
    "__v": 0
}
```

You can be redirected to the original url with this api:
```
GET <url of the service>/<urlId>
```
Redirection is made using 302 status code (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302).

Example:
```
GET http://localhost:3000/AwMcA4hQR
```

## How to run

You can run the service using docker-compose:

```
docker-compose build
docker-compose up
```

The service is listening for request on port 3000.

## TODO
- implement unit tests
- production-ready

## Microservice architecture

![Proposed architecture](https://github.com/jobezic/tinyurl/blob/main/docs/tinyurl_microservices.jpg)
