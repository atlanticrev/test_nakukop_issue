import React from 'react';
import Head from 'next/head';

import Catalog from '../components/Catalog';
import Cart from '../components/Cart';
import { useCatalogData } from "../hooks/useCatalogData";
import { useDollarRate } from "../hooks/useDollarRate";
import { useCartData } from "../hooks/useCartData";

export default function Home() {
    const catalogData = useCatalogData();
    const dollarRate = useDollarRate();
    const cartData = useCartData();

    return (
        <>
            <Head>
                <title>Nakukop test</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Catalog
                catalogData={catalogData}
                cartData={cartData}
            />
            <Cart
                dollarRate={dollarRate}
                cartData={cartData}
            />

            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    border: 0;
                    box-sizing: border-box;
                }
                
                html,
                body {
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                    background-color: white;
                    color: black;
                    font-size: 16px;
                }
                
                a {
                    text-decoration: none;
                }
                
                th, td {
                    border: 1px solid darkgray;
                    padding: 15px 20px;
                    user-select: none;
                }
                
                th {
                    background-color: lightslategray;
                    color: white;
                }
            `}</style>
        </>
    );
}
