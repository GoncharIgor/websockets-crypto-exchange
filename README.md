# How to start BE:
1. `cd server`
2. `yarn install`
3. `yarn start`

# How to start FE:
1. `cd ui`
2. `yarn install`
3. `yarn start`
4. open `http://localhost:3002`

## Mocked data:
Since DB is not implemented in this task, the initial state of mock orders comes from:
`server/db/mock-orders-obj.js`
Note:
- The state is reset to default only when server restart
- JS file is used for easiness of manipulation
- All operations are async, to simulate requests to DB

## Known bugs:
1. FrontEnd: If order is confirmed with the same amount as previous one (and amount is 1 character: between 1-9), 
then [buy] and [sell] buttons are disabled until you blur any other element
It seems to be a bug of `react-hook-form` library
2. FrontEnd:  findDOMNode is deprecated in StrictMode - error is thrown in console when snackbar is opened
It a bug of `react-simple-snackbar` library itself
3. BackEnd: Order amount is not taken into account when closing matching buy<=>sell orders:
It means that order can't be filled partially - the system will ignore differences in sizes
