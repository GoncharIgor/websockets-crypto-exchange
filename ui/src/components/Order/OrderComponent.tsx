import React from 'react';

import { Order } from '../../types/Order';
import styles from './OrderComponent.module.css';

interface OrderComponentProps {
    order: Order;
}

export const OrderComponent: React.FC<OrderComponentProps> = ({ order }): JSX.Element => {
    const tradingCurrency = order.currencyPair.substring(0, 3);
    const image = require('../../assets/' + tradingCurrency + '.webp');

    return (
        <tr className={styles.order}>
            <td className={styles.pair}>
                <img src={image} alt={tradingCurrency} />
                {order.currencyPair.toUpperCase()}
            </td>
            <td className={order.side === 'buy' ? styles['buy-side'] : styles['sell-side']}>
                {order.side}
            </td>
            <td>{order.price}</td>
            <td>{order.size}</td>
        </tr>
    );
};
