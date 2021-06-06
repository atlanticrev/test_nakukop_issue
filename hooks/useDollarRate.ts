import { useState, useEffect } from 'react';

const DOLLAR_RATE_CHANGE_INTERVAL = 400;

const DOLLAR_RATE_MIN = 60;
const DOLLAR_RATE_MAX = 100;

const DOLLAR_RATE_INITIAL = 75;

function getRandomIntValue(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}

export function useDollarRate(initialState: number = DOLLAR_RATE_INITIAL) {
    const [dollarRate, setDollarRate] = useState(initialState);

    function intervalTick() {
        setDollarRate(getRandomIntValue(DOLLAR_RATE_MIN, DOLLAR_RATE_MAX));
    }

    useEffect(() => {
        const intervalId = setInterval(intervalTick, DOLLAR_RATE_CHANGE_INTERVAL);
        return () => clearInterval(intervalId);
    }, []);

    return dollarRate;
}
