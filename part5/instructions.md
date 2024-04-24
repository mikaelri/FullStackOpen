## Starting the application

1. Start the backend production in *bloglist-backend* folder with command:
```
npm start
```

2. Send a post request inside the bloglist-backend/requests/add_user.rest (choose username of your wish) to activate the jwt token.

3. Launch the front-end in *bloglist-frontend* folder with command:
```
npm run dev
```

## Testing
When running the E2E tests use the testing environment for backend, which can be launced in *bloglist-backend* folder with command:
```
npm run start:test
```
When the backend testing environment and front-end is on, run the E2E tests in *bloglist-e2e* folder with command:
```
npm run test --ui
```

Backend tests can be run in *bloglist-backend* folder with command: command:
```
npm test
```





