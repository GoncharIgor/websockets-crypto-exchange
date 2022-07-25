import { useForm } from 'react-hook-form';
import { useState } from 'react';

import styles from './TradingForm.module.css';

type FormValues = {
    price: number;
    size: number;
};

export interface ChildProps {
    formSubmitHandler: (formData: any, side: string) => void;
}

export const TradingForm = (props: ChildProps): JSX.Element => {
    const [side, setSide] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm<FormValues>({ mode: 'all', reValidateMode: 'onBlur' });

    const onSubmit = (data: any, side: string) => {
        props.formSubmitHandler(data, side);
        reset();
    };

    return (
        <form
            className={styles['trading-form']}
            onSubmit={handleSubmit((data) => onSubmit(data, side))}
        >
            <label htmlFor="price">Price:</label>
            <input
                type="number"
                {...register('price', {
                    required: true,
                    valueAsNumber: true
                })}
                id="price"
                autoComplete="off"
            />

            <label htmlFor="size">Amount:</label>
            <input
                type="number"
                {...register('size', {
                    required: true,
                    valueAsNumber: true
                })}
                id="size"
                autoComplete="off"
            />

            <button disabled={!isValid} onClick={() => setSide('buy')} className={styles.buy}>
                BUY
            </button>
            <button disabled={!isValid} onClick={() => setSide('sell')} className={styles.sell}>
                SELL
            </button>
        </form>
    );
};
