import React from 'react';
import { render, screen } from '@testing-library/react';
import { OrderComponent } from './OrderComponent';
import { Order } from '../../types/Order';

describe('Header', () => {
    const testOrder: Order = {
        currencyPair: 'BTC/USD',
        price: 33333,
        side: 'sell',
        size: 22,
        status: 'opened',
        userId: 'IgorGonchar'
    };

    beforeEach(() => {
        // react-testing-library renders into a div by default but you can render your component inside another element instead
        const tableRow = document.createElement('tbody');
        render(<OrderComponent order={testOrder} />, {
            container: document.body.appendChild(tableRow)
        });
    });

    test('should render order component row', () => {
        const row = screen.getByText('BTC/USD').closest('tr');
        expect(row).toBeInTheDocument();
    });

    test('should render correct side cell', () => {
        const sideCellElement = screen.getAllByRole('cell')[1];

        expect(sideCellElement).toHaveTextContent(/sell/);
    });

    test('should render correct side cell background color', () => {
        const sideCellElement = screen.getAllByRole('cell')[1];

        expect(sideCellElement).toHaveClass('sell-side');
    });

    test('should not has another side "buy" clas', () => {
        const sideCellElement = screen.getAllByRole('cell')[1];

        expect(sideCellElement).not.toHaveClass('buy-side');
    });

    test('should render correct price cell', () => {
        const sideCellElement = screen.getAllByRole('cell')[2];

        expect(sideCellElement).toHaveTextContent(/33333/);
    });

    test('should render correct size cell', () => {
        const sideCellElement = screen.getAllByRole('cell')[3];

        expect(sideCellElement).toHaveTextContent(/22/);
    });
});
