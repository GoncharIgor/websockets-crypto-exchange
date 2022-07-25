const mockOrders = require('../db/mock-orders-obj');

// async functions - for simulation promises with DB requests
async function getAllOrdersByUserId(userId) {
    return mockOrders.filter(order => order.userId === userId);
}

async function getOpenOrdersByUserId(userId) {
    const allOrdersForUser = await getAllOrdersByUserId(userId);
    return allOrdersForUser.filter(order => order.status === 'opened');
}

async function addOrder(order) {
    const {side, currencyPair, userId} = order;

    //
    const ordersFilteredByCurrency = mockOrders
        .filter(order => order.currencyPair === currencyPair
            && order.status === 'opened'
            && order.userId === userId)
        .filter(order => (side === 'sell') ? order.side === 'buy' : order.side === 'sell')
        .sort((a, b) => {
            if (side === 'sell') {
                return b.price - a.price;
            }
            return a.price - b.price;
        })

    // closing "sell" orders for created "buy" order
    if (side === 'buy' && ordersFilteredByCurrency[0]?.price <= order.price
    || side === 'sell' && ordersFilteredByCurrency[0]?.price >= order.price) {
        removeFromArrById(mockOrders, ordersFilteredByCurrency[0].id);
        console.log(`Order ${order.id} was traded with existing order ${ordersFilteredByCurrency[0].id}`);
        return true;
    }

    console.log(`Order ${order.id} was added to OrderBook`);
    mockOrders.push(order);
    return false;
}

function removeFromArrById(arr, id) {
    const index = arr.findIndex((o) => o.id === id)
    if (index !== -1) arr.splice(index, 1);
}

module.exports = {getAllOrdersByUserId, addOrder, getOpenOrdersByUserId};
