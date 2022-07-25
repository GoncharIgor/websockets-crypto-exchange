import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useSnackbar } from 'react-simple-snackbar';

import { Header } from './components/Header/Header';
import { OrderBook } from './components/OrderBook/OrderBook';
import { TradingForm } from './components/TradingForm/TradingForm';
import { TradedCurrencySelector } from './components/TradedCurrencySelector/TradedCurrencySelector';

import styles from './App.module.css';

import { Order } from './types/Order';
import socket from './socket';
import { TradingCurrencyContext } from './context/tradingCurrency';

const snackBarOptions = {
    style: {
        backgroundColor: 'rgb(0 128 0 / 28%)',
        color: 'black',
        fontSize: '18px'
    },
    closeStyle: {
        color: 'black',
        fontSize: '16px'
    }
};

function App(): JSX.Element {
    const userId = 'IgorGonchar'; // has to be in global state management storage/context
    const [openOrders, setOpenOrders] = useState<Order[]>([]);
    const [activeCurrency, setActiveCurrency] = useState('btc');

    const [openSnackbar] = useSnackbar(snackBarOptions);

    useEffect(() => {
        socket.emit('GET_ORDERS', userId);

        socket.on('ORDERS_SENT', (ordersReceivedFromBE: Order[]) => {
            setOpenOrders(ordersReceivedFromBE);
        });

        socket.on('ORDER_EXECUTED', (ordersReceivedFromBE: Order[]) => {
            openSnackbar('Order was successfully executed');
        });
    }, []);

    const isOrderPriceReachedBoundary = (side: string, orderPrice: number) => {
        const openOrdersForActiveCurrency = openOrders.filter(
            (order) => order.currencyPair === `${activeCurrency}/usd`
        );

        if (!openOrdersForActiveCurrency.length) return false;

        if (side === 'buy') {
            const buyOrders = openOrdersForActiveCurrency
                .filter((order) => order.side === 'buy')

                .sort((a, b) => {
                    return b.price - a.price;
                });

            return !!buyOrders[0] && orderPrice > buyOrders[0].price * 1.1;
        }

        const sellOrders = openOrdersForActiveCurrency
            .filter((order) => order.side === 'sell')
            .sort((a, b) => {
                return a.price - b.price;
            });

        return !!sellOrders[0] && orderPrice < sellOrders[0].price * 0.9;
    };

    const createOrder = (data: any, side: string) => {
        const order: Order = {
            price: data.price,
            size: data.size,
            status: 'opened',
            currencyPair: `${activeCurrency}/usd`,
            side,
            userId: 'IgorGonchar'
        };

        socket.emit('SEND_ORDER', order);
    };

    const createOrderFormHandler = (data: any, side: string) => {
        const isPriceBoundaryReached = isOrderPriceReachedBoundary(side, data.price);

        if (isPriceBoundaryReached) {
            confirmAlert({
                title: 'Submit order?',
                message: `Your order price is 10% ${
                    side === 'buy'
                        ? `higher than highest buy order for ${activeCurrency.toUpperCase()}`
                        : `lower than lowest sell order for ${activeCurrency.toUpperCase()}`
                }`,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => createOrder(data, side)
                    },
                    {
                        label: 'No',
                        onClick: () => {}
                    }
                ]
            });
        } else {
            createOrder(data, side);
        }
    };

    return (
        <TradingCurrencyContext.Provider value={{ activeCurrency, setActiveCurrency }}>
            <div className={styles.app}>
                <Header title="Light Crypto Exchange" />
                <div className="container">
                    <TradedCurrencySelector />
                    <TradingForm formSubmitHandler={createOrderFormHandler} />
                    <OrderBook orders={openOrders} />
                </div>
            </div>
        </TradingCurrencyContext.Provider>
    );
}

export default App;
