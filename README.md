# Bettersocial Test

## Tech Stack

- [NestJS](https://github.com/nestjs/nest)
- [TypeORM](https://docs.nestjs.com/recipes/hot-reload#typeorm)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [GraphQL](https://docs.nestjs.com/graphql/quick-start)

## How to run

```sh
docker-compose up --build
npm install
npm run start:dev
```

## API Contract

### Create Account

#### Request

```sh
curl --location 'http://localhost:6000/graphql' \
--header 'Content-Type: application/json' \
--data '{"query":"mutation {\n  createAccount(input: {\n    username: \"username\",\n    password: \"password\",\n  }) {\n    ok\n    error\n  }\n}","variables":{}}'
```

#### Response

##### Positive Case

```json
{
    "data": {
        "createAccount": {
            "ok": true,
            "error": null
        }
    }
}
```

##### Negative Case - Not Alphanumeric Username

```json
{
    "errors": [
        {
            "message": "Bad Request Exception",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "createAccount"
            ],
            "extensions": {
                "code": "INTERNAL_SERVER_ERROR",
                "exception": {
                    "response": {
                        "statusCode": 400,
                        "message": [
                            "username must contain only letters and numbers"
                        ],
                        "error": "Bad Request"
                    },
                    "status": 400,
                    "message": "Bad Request Exception",
                    "stacktrace": [
                        "Error: Bad Request Exception",
                        "    at ValidationPipe.exceptionFactory (/Users/dhiazfathra/Documents/GitHub/dhiazfathra/bettersocial/bettersocial-test-dhiazfathra/node_modules/@nestjs/common/pipes/validation.pipe.js:89:20)",
                        "    at ValidationPipe.transform (/Users/dhiazfathra/Documents/GitHub/dhiazfathra/bettersocial/bettersocial-test-dhiazfathra/node_modules/@nestjs/common/pipes/validation.pipe.js:65:30)",
                        "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
                        "    at async resolveParamValue (/Users/dhiazfathra/Documents/GitHub/dhiazfathra/bettersocial/bettersocial-test-dhiazfathra/node_modules/@nestjs/core/helpers/external-context-creator.js:143:31)",
                        "    at async Promise.all (index 0)",
                        "    at async pipesFn (/Users/dhiazfathra/Documents/GitHub/dhiazfathra/bettersocial/bettersocial-test-dhiazfathra/node_modules/@nestjs/core/helpers/external-context-creator.js:145:13)",
                        "    at async /Users/dhiazfathra/Documents/GitHub/dhiazfathra/bettersocial/bettersocial-test-dhiazfathra/node_modules/@nestjs/core/helpers/external-context-creator.js:68:17",
                        "    at async target (/Users/dhiazfathra/Documents/GitHub/dhiazfathra/bettersocial/bettersocial-test-dhiazfathra/node_modules/@nestjs/core/helpers/external-context-creator.js:76:28)",
                        "    at async /Users/dhiazfathra/Documents/GitHub/dhiazfathra/bettersocial/bettersocial-test-dhiazfathra/node_modules/@nestjs/core/helpers/external-proxy.js:9:24"
                    ]
                }
            }
        }
    ],
    "data": null
}
```

##### Negative Case - Username Exists

```json
{
    "errors": [
        {
            "message": "username is already in use.",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "createAccount"
            ],
            "extensions": {
                "code": "INTERNAL_SERVER_ERROR",
                "exception": {
                    "stacktrace": [
                        "Error: username is already in use.",
                        "    at UsersService.createAccount (/Users/dhiazfathra/Documents/GitHub/dhiazfathra/bettersocial/bettersocial-test-dhiazfathra/dist/users/users.service.js:32:19)",
                        "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
                        "    at async target (/Users/dhiazfathra/Documents/GitHub/dhiazfathra/bettersocial/bettersocial-test-dhiazfathra/node_modules/@nestjs/core/helpers/external-context-creator.js:76:28)",
                        "    at async /Users/dhiazfathra/Documents/GitHub/dhiazfathra/bettersocial/bettersocial-test-dhiazfathra/node_modules/@nestjs/core/helpers/external-proxy.js:9:24"
                    ]
                }
            }
        }
    ],
    "data": null
}
```

### Login

#### Request

```sh
curl --location 'http://localhost:6000/graphql' \
--header 'Content-Type: application/json' \
--data '{"query":"mutation {\n  login(input: {\n    username: \"username\",\n    password: \"password\"\n  }) {\n    ok\n    error\n    token\n  }\n}\n","variables":{}}'
```


#### Response

##### Positive Case

```json
{
    "data": {
        "login": {
            "ok": true,
            "error": null,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VybmFtZSIsImlhdCI6MTY4NDgyOTI5N30.zWSproZ9LKyAbcxRPCzncpl5I1G6o7ZOxW66X4TGPKI"
        }
    }
}
```

##### Negative Case - Wrong Password

```json
{
    "errors": [
        {
            "message": "Invalid username or password",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "login"
            ],
            "extensions": {
                "code": "INTERNAL_SERVER_ERROR",
                "exception": {
                    "response": {
                        "statusCode": 401,
                        "message": "Invalid username or password",
                        "error": "Unauthorized"
                    },
                    "status": 401,
                    "message": "Invalid username or password",
                    "stacktrace": [
                        "Error: Invalid username or password",
                        "    at UsersService.login (/Users/dhiazfathra/Documents/GitHub/dhiazfathra/bettersocial/bettersocial-test-dhiazfathra/dist/users/users.service.js:46:19)",
                        "    at async target (/Users/dhiazfathra/Documents/GitHub/dhiazfathra/bettersocial/bettersocial-test-dhiazfathra/node_modules/@nestjs/core/helpers/external-context-creator.js:76:28)",
                        "    at async /Users/dhiazfathra/Documents/GitHub/dhiazfathra/bettersocial/bettersocial-test-dhiazfathra/node_modules/@nestjs/core/helpers/external-proxy.js:9:24"
                    ]
                }
            }
        }
    ],
    "data": null
}
```