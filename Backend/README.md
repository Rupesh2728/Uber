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

### Success (201 Created)

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

### Validation Error (400 Bad Request)

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

### Missing Fields (400 Bad Request)

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
