# API

## Continue

- `200 OK` when user login
- `201 Created ` when a new user register
- `401 Unauthorized` for wrong credentials
- `500 Internal Server Error` for server-side auth issues

#### important

- `400 Bad Request` msg: email and password are required

---------

## GET /notes

- `200 OK`
- `400 Bad Request` for invalid `id` query value

#### important

- `401 Unauthorized` when no valid token is provided, msg: Missing or invalid token
- `404 Not Found` when a requested note by `id` does not exist , msg: note not found

----

## POST /notes

- `201 Created`
- `400 Bad Request` for missing title/category, msg: Title and category are required
- `401 Unauthorized`


----

## PATCH /notes

- `200 OK`
- `400 Bad Request` for missing/invalid note id, msg: note not found
- `401 Unauthorized`
- `404 Not Found`

----

## Delete /notes

- `200 OK`
- `400 Bad Request` for missing/invalid note id
- `401 Unauthorized`
- `404 Not Found`

