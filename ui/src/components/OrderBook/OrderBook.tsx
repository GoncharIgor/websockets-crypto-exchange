import React, { useContext } from 'react';

import { Order } from '../../types/Order';
import { OrderComponent } from '../Order/OrderComponent';

import styles from './OrderBook.module.css';
import { TradingCurrencyContext } from '../../context/tradingCurrency';

interface OrderComponentProps {
    orders: Order[];
}

export const OrderBook: React.FC<OrderComponentProps> = ({ orders }): JSX.Element => {
    const { activeCurrency } = useContext(TradingCurrencyContext);

    const filteredOrdersByCurrency = orders.filter(
        (order) => order.currencyPair.substring(0, 3) === activeCurrency
    );

    //  Sort buy orders by price descending and the sell orders by price ascending.
    const buyOrders = filteredOrdersByCurrency
        .filter((order) => order.side === 'buy')
        .sort((a, b) => {
            return b.price - a.price;
        });
    const sellOrders = filteredOrdersByCurrency
        .filter((order) => order.side === 'sell')
        .sort((a, b) => {
            return a.price - b.price;
        });

    const renderOrders = (ordersBySide: Order[]) => {
        return ordersBySide.map((order: Order) => {
            return <OrderComponent key={order.id} order={order} />;
        });
    };

    return (
        <div className="orderbook">
            <h2 className="global-header2">Open Orders:</h2>
            <table className={styles['orders-table']}>
                <thead>
                    <tr>
                        <th>Pair</th>
                        <th>Side</th>
                        <th>Price</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    {renderOrders(buyOrders)}
                    {renderOrders(sellOrders)}
                </tbody>
            </table>
            {!filteredOrdersByCurrency.length ? (
                <div className={styles['empty-state']}>
                    <p>No open orders for {activeCurrency.toUpperCase()} yet</p>
                </div>
            ) : (
                <p className={styles.total}>
                    Total open orders: <strong>{filteredOrdersByCurrency.length}</strong>
                </p>
            )}
        </div>
    );
};
