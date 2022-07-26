import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
    test('should render same text passed into title prop', () => {
        render(<Header title="My header" />);
        const headingElement = screen.getByText(/my header/i);

        expect(headingElement).toBeInTheDocument();
    });
});
