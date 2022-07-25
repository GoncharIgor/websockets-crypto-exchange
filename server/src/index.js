require('./env');

const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
const {v4: uuidv4} = require('uuid');

const {getOpenOrdersByUserId, addOrder} = require('./ordersController');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

app.get('/', (req, res) => {
    res.send('health-check success')
});

io.on('connection', (socket) => {
    console.log('a user connected with socket ID:', socket.id);

    socket.on('GET_ORDERS', async (userId) => {
        const ordersForCurrentUser = await getOpenOrdersByUserId(userId);
        console.log(`Sending open orders for user: ${userId}. Found number of orders: ${ordersForCurrentUser.length}`);

        io.emit('ORDERS_SENT', ordersForCurrentUser);
    });

    socket.on('SEND_ORDER', async (order) => {
        order.id = uuidv4();
        console.log(`Adding order with id ${order.id} for user: ${order.userId}`);


        const isOrderWasInstantlyExecuted = await addOrder(order);
        if (isOrderWasInstantlyExecuted) {
            io.emit('ORDER_EXECUTED');
        }
        const ordersForCurrentUser = await getOpenOrdersByUserId(order.userId);
        io.emit('ORDERS_SENT', ordersForCurrentUser);
    })
});

server.listen(process.env.PORT, () => {
    console.log('listening on port:', process.env.PORT);
});


