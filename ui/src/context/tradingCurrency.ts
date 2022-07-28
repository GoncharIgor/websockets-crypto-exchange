import { createContext, Dispatch, SetStateAction } from 'react';

interface ITradingCurrencyContext {
    activeCurrency: string;
    setActiveCurrency?: Dispatch<SetStateAction<string>>;
}

// Settings default values
// These well later be overwritten by specifying 'value'
const defaultState = {
    activeCurrency: 'btc',
    setActiveCurrency: () => ''
};

// default state is indicated in App component, in Provider
export const TradingCurrencyContext = createContext<ITradingCurrencyContext>(defaultState);
