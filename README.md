# Home Library Service

## DOCS
 [Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md)
  [Score](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/score.md)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Commands


## Downloading

```
git clone {repository URL}
```


## Running application

```
docker-compose up
```

## Run migrations

```
npm run migration:run
```
if migrations doesn`t exist in folder ./src/migrations - you should look title "generate:migrations"

## Generate migrations

```
npm run migration:generate ./src/migrations/example  
``` 
after that start migration:run

## Docker vulnerable scanning

```
npm run docker-scan-db 
``` 

or

```
npm run docker-scan-app
``` 


## Testing auth

After application running open new terminal and enter:

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```


### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
