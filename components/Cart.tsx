import React from 'react';
import { useRef } from 'react';
import CartProduct from "./CartProduct";
import { CartData } from "../hooks/useCartData";

type ProductCartProps = {
    dollarRate: number;
    cartData: CartData;
};

export default function Cart({ dollarRate, cartData }: ProductCartProps) {
    const itemPriceCssClass = useDollarRateIndicator(dollarRate);

    let totalPrice = 0;
    let cartProducts = [];
    for (let productId of Object.keys(cartData.state)) {
        const product = cartData.state[productId].product;
        const productQty = cartData.state[productId].qty;
        const itemTotalPrice = product.price * dollarRate * productQty;
        totalPrice += itemTotalPrice;
        cartProducts.push(
            <CartProduct
                key={product.id}
                product={product}
                productQtyInCart={productQty}
                itemTotalPrice={itemTotalPrice}
                itemPriceCssClass={itemPriceCssClass}
                cartData={cartData}
            />
        );
    }

    return (
        <div className="cart-container">
            <h2 className="cart-title">Корзина товаров</h2>
            <table className="cart">
                <tbody>
                    <tr>
                        <th className="cart-column-title">Наименование товара и описание</th>
                        <th className="cart-column-title">Количество</th>
                        <th className="cart-column-title" colSpan={2}>Цена</th>
                    </tr>
                    {cartProducts}
                </tbody>
            </table>
            <div className="cart-total">
                <div className="cart-total-dollar-rate">Текущий курс доллара: 1 $ = {dollarRate.toFixed(0)} руб.</div>
                <div className="cart-total-value">Общая стоимость: {totalPrice.toFixed(2)} руб.</div>
            </div>

            <style jsx>{`
                .cart-container {
                    width: 1200px;
                    margin: 15px auto;
                    padding: 5px;
                }
                
                .cart-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                }
                
                .cart {
                    width: 100%;
                    margin: 15px 0;
                    border: 1px solid lightgray;
                    border-collapse: collapse;
                }
                
                .cart-column-title {
                    padding: 15px 20px;
                    text-align: left;
                }
                
                .cart-total {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: space-between;
                    align-items: center;
                    margin: 15px 0;
                }
                
                .cart-total-dollar-rate,
                .cart-total-value {
                    font-size: 1.3rem;
                }
            `}</style>
        </div>
    );
}

function useDollarRateIndicator(dollarRate: number) {
    const prevDollarRate = useRef(dollarRate);
    const prevCssClass = useRef('product-price');
    if (prevDollarRate.current === dollarRate) {
        return prevCssClass.current;
    }
    const newCssClass = dollarRate > prevDollarRate.current
        ? 'product-price decreased'
        : 'product-price increased';
    prevDollarRate.current = dollarRate;
    prevCssClass.current = newCssClass;
    return newCssClass;
}
