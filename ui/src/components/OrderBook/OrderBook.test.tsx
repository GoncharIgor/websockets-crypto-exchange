import React from 'react';
import { render, screen } from '@testing-library/react';

import { OrderBook } from './OrderBook';
import { TradingCurrencyContext } from '../../context/tradingCurrency';

const mockOrders = [
    {
        id: '00001',
        price: 23000,
        size: 0.1,
        currencyPair: 'btc/usd',
        side: 'sell',
        status: 'opened',
        userId: 'IgorGonchar'
    },
    {
        id: '00002',
        price: 23500,
        size: 0.2,
        currencyPair: 'btc/usd',
        side: 'sell',
        status: 'opened',
        userId: 'IgorGonchar'
    },
    {
        id: '00003',
        price: 20000,
        size: 0.2,
        currencyPair: 'btc/usd',
        side: 'buy',
        status: 'opened',
        userId: 'IgorGonchar'
    },
    {
        id: '00004',
        price: 20000,
        size: 23,
        currencyPair: 'btc/usd',
        side: 'buy',
        status: 'opened',
        userId: 'AnotherUser'
    },
    {
        id: '00005',
        price: 21500,
        size: 0.2,
        currencyPair: 'btc/usd',
        side: 'sell',
        status: 'opened',
        userId: 'IgorGonchar'
    }
];

describe('Header', () => {
    test('should render OrdersBook component', () => {
        render(<OrderBook orders={mockOrders} />);
        const headingElement = screen.getByText(/Open Orders:/);
        const tableElement = screen.getByRole('table');

        expect(headingElement).toBeInTheDocument();
        expect(tableElement).toBeInTheDocument();
    });

    test('should not render Empty state component', () => {
        render(<OrderBook orders={mockOrders} />);
        const emptyStateElement = screen.queryByText(/No open orders/i);

        expect(emptyStateElement).not.toBeInTheDocument();
    });

    test('should render Empty state component with default traded currency', () => {
        render(<OrderBook orders={[]} />);
        const emptyStateElement = screen.getByText(/No open orders for BTC yet/i);

        expect(emptyStateElement).toBeInTheDocument();
    });

    test('should render Empty state component with updated traded currency', () => {
        const providerProps = {
            activeCurrency: 'eth'
        };

        render(
            <TradingCurrencyContext.Provider value={providerProps}>
                <OrderBook orders={[]} />
            </TradingCurrencyContext.Provider>
        );
        const emptyStateElement = screen.getByText(/No open orders for ETH yet/i);

        expect(emptyStateElement).toBeInTheDocument();
    });
});
