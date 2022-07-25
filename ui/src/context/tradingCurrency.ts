import { createContext, Dispatch, SetStateAction } from 'react';

interface ITradingCurrencyContext {
    activeCurrency: string;
    setActiveCurrency?: Dispatch<SetStateAction<string>>;
}

const defaultState = {
    activeCurrency: 'btc'
};

// default state is indicated in App component, in Provider
export const TradingCurrencyContext = createContext<ITradingCurrencyContext>(defaultState);
