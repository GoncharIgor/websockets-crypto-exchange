import React, { useContext } from 'react';

import { TradedCurrency } from '../TradedCurrency/TradedCurrency';

import { TradingCurrencyContext } from '../../context/tradingCurrency';
import styles from './TradedCurrencySelector.module.css';

// ideally - it has to be moved to BE
const listOfSupportedTradedCurrencies = ['btc', 'ltc', 'eth', 'bnb', 'xrp'];

export const TradedCurrencySelector = (): JSX.Element => {
    const { activeCurrency } = useContext(TradingCurrencyContext);

    const renderTradedCurrencies = () =>
        listOfSupportedTradedCurrencies.map((currency: string) => (
            <TradedCurrency key={currency} currency={currency} />
        ));

    return (
        <>
            <h2 className="global-header2">
                I want to Buy:{' '}
                <span className={styles['selected-currency']}>{activeCurrency.toUpperCase()}</span>
            </h2>
            <div className={styles['currencies-list']}>{renderTradedCurrencies()}</div>
        </>
    );
};
