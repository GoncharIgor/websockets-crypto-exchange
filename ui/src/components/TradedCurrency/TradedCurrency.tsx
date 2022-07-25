import React, { useContext } from 'react';

import { TradingCurrencyContext } from '../../context/tradingCurrency';
import styles from './TradedCurrency.module.css';

interface TradedCurrencyProps {
    currency: string;
}

export const TradedCurrency: React.FC<TradedCurrencyProps> = ({ currency }): JSX.Element => {
    const { activeCurrency, setActiveCurrency } = useContext(TradingCurrencyContext);

    const image = require('../../assets/' + currency + '.webp');

    return (
        <div
            className={`${styles.currency} ${currency === activeCurrency ? styles.active : ''}`}
            onClick={() => setActiveCurrency?.(currency)}
        >
            <img src={image} alt={currency} />
            <p>{currency.toUpperCase()}</p>
        </div>
    );
};
