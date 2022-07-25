export interface Order {
    id?: string;
    price: number;
    size: number;
    currencyPair: string;
    side: string;
    status: string;
    userId: string;
}
