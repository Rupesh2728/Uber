# Backend API Documentation

## `POST /users/register` Endpoint

### Description

Registers a new user in the system. This endpoint validates the input, hashes the password, creates a user, and returns an authentication token along with the user data.

### Request Body

The request body must be in JSON format and include the following fields:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (optional, min 3 chars)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example Request

```
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success (201 Created)

```
Status: 201 Created
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  }
}
```

#### Validation Error (400 Bad Request)

```
Status: 400 Bad Request
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    // ...other errors
  ]
}
```

#### Missing Fields (400 Bad Request)

```
Status: 400 Bad Request
{
  "errors": [
    {
      "msg": "All fields are required"
    }
  ]
}
```

### Notes

- The `email` must be unique.
- The password is securely hashed before storage.
- The response includes a JWT token for authentication.

---

## `POST /users/login` Endpoint

### Description

Authenticates a user with email and password. Returns a JWT token and user data if credentials are valid.

### Request Body

The request body must be in JSON format and include the following fields:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example Request

```
POST /users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success (200 OK)

```
Status: 200 OK
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  }
}
```

#### Validation Error (400 Bad Request)

```
Status: 400 Bad Request
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    // ...other errors
  ]
}
```

#### User Not Found (404 Not Found)

```
Status: 404 Not Found
{
  "message": "User not found"
}
```

#### Invalid Credentials (401 Unauthorized)

```
Status: 401 Unauthorized
{
  "message": "Invalid credentials"
}
```

### Notes

- Returns a JWT token for authentication on successful login.
- Password is not included in the response.

---

## `GET /users/profile` Endpoint

### Description

Returns the profile information of the currently authenticated user. Requires a valid JWT token (sent as a cookie or in the `Authorization` header as `Bearer <token>`).

### Authentication

- This endpoint is protected. You must be logged in and provide a valid token.

### Example Request

```
GET /users/profile
Authorization: Bearer <jwt_token>
```

### Success Response (200 OK)

```
Status: 200 OK
{
  "_id": "<user_id>",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
  // ...other user fields
}
```

### Error Responses

- `401 Unauthorized` if the token is missing, invalid, or blacklisted.
- `404 Not Found` if the user does not exist.

### Notes

- The token can be sent as a cookie (`token`) or in the `Authorization` header.
- Returns the user object for the authenticated user.

---

## `GET /users/logout` Endpoint

### Description

Logs out the currently authenticated user by blacklisting the JWT token and clearing the authentication cookie.

### Authentication

- This endpoint is protected. You must be logged in and provide a valid token.

### Example Request

```
GET /users/logout
Authorization: Bearer <jwt_token>
```

### Success Response (200 OK)

```
Status: 200 OK
{
  "message": "Logged out successfully"
}
```

### Error Responses

- `401 Unauthorized` if the token is missing, invalid, or blacklisted.

### Notes

- The token is added to a blacklist and will no longer be valid for authentication.
- The authentication cookie (`token`) is cleared on logout.
