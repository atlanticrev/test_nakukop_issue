import React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head';

const INTERVAL_DATA_FETCHING = 15000;

export const PRODUCT = {
    ID: 'T',
    GROUP_ID: 'G',
    QTY: 'P',
    PRICE: 'C',
    NAME: 'N'
};

export const GROUP = {
    NAME: 'G',
    PRODUCTS: 'B'
};

import ProductCatalog from '../components/ProductCatalog.js';
import ProductCart from '../components/ProductCart.js';

export default function Home() {
    const data = useData([]);
    const dollarRate = useDollarRate(75);
    const cartData = useCart({});

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ProductCatalog
                data={data}
                addToCart={cartData.addProduct}
            />
            <ProductCart
                dollarRate={dollarRate}
                products={cartData.products}
                removeFromCart={cartData.removeProduct}
                handleQtyChange={cartData.changeQty}
            />
        </>
    );
}

function useData(initialState) {
    const [data, setData] = useState(initialState);
    const [, setTimeoutId] = useState(-1);

    async function fetchData() {
        const responses = await Promise.all([
            window.fetch('/mock_data/names.json'),
            window.fetch('/mock_data/products.json')
        ]);
        return  await Promise.all(responses.map(response => response.json()));
    }

    function processData(data) {
        if (data.length) {
            // Form product groups
            const [namesData, productsData] = data;
            const groups = [];
            for (let groupId of Object.keys(namesData)) {
                groups.push({
                    name: namesData[groupId][GROUP.NAME],
                    id: groupId,
                    products: []
                });
            }
            // Form products list of each group
            for (let productData of productsData['Value']['Goods']) {
                const group = groups.find(group => group.id.toString() === productData[PRODUCT.GROUP_ID].toString());
                if (group) {
                    group.products.push({
                        name: namesData[group.id][GROUP.PRODUCTS][productData[PRODUCT.ID]][PRODUCT.NAME],
                        id: productData[PRODUCT.ID],
                        qty: productData[PRODUCT.QTY],
                        price: productData[PRODUCT.PRICE]
                    });
                }
            }
            return groups;
        }
        return [];
    }

    function getDataForInterval() {
        fetchData()
            .then((data) => {
                const processedData = processData(data);
                setData(processedData);
                return Promise.resolve(processedData);
            })
            .then(() => setTimeoutId(setTimeout(getDataForInterval, INTERVAL_DATA_FETCHING)));
    }

    useEffect(() => getDataForInterval(), []);

    return data;
}

function useDollarRate(initialState) {
    const [dollarRate, setDollarRate] = useState(initialState);
    const [timeoutId, setTimeoutId] = useState(-1);

    function timeoutTick() {
        setDollarRate(Math.round(Math.random() * (100 - 60) + 60)); // 2.5 - 4 per second, each 250 - 400 ms
        const TIMEOUT = Math.round(Math.random() * (400 - 250) + 250);
        setTimeoutId(setTimeout(() => timeoutTick(), TIMEOUT));
    }

    useEffect(() => {
        timeoutTick();
        return () => clearInterval(timeoutId);
    }, []);

    return dollarRate;
}

function useCart(initialState = {}) {
    const [products, setProducts] = useState(initialState);

    function addProduct(productData) {
        if (products[productData.id]) {
            const updatedProducts = {
                ...products,
                [productData.id]: {
                    product: productData,
                    qty: products[productData.id].qty + 1
                }
            };
            localStorage.setItem('cart-products', JSON.stringify(updatedProducts));
            setProducts(updatedProducts);
        } else {
            const updatedProducts = {
                ...products,
                [productData.id]: {
                    product: productData,
                    qty: 1
                }
            };
            localStorage.setItem('cart-products', JSON.stringify(updatedProducts));
            setProducts(updatedProducts);
        }
    }

    function removeProduct(productData) {
        const updatedProducts = {...products};
        delete updatedProducts[productData.id];
        localStorage.setItem('cart-products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
    }

    function changeQty(productData, e) {
        const updatedProducts = {
            ...products,
            [productData.id]: {
                product: productData,
                qty: e.target.value
            }
        };
        localStorage.setItem('cart-products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
    }

    useEffect(() => {
        if (localStorage.getItem('cart-products')) {
            setProducts(JSON.parse(localStorage.getItem('cart-products')));
        }
    }, []);

    return {
        products,
        addProduct,
        removeProduct,
        changeQty
    };
}
