import React from 'react';

export default function ProductCart({ dollarRate, products, removeFromCart, handleQtyChange }) {
    let totalPrice = 0;
    let cartProducts = [];
    for (let productId of Object.keys(products)) {
        const product = products[productId].product;
        const productQty = products[productId].qty;
        const itemTotalPrice = Math.round(product.price * dollarRate * productQty);

        totalPrice += itemTotalPrice;

        cartProducts.push(
            <tr className="product-cart__product" key={product.id}>
                <td className="product-cart__product-name">{product.name}</td>
                <td className="product-cart__product-qty">
                    <input
                        className="product-cart__product-qty-value"
                        type="text"
                        value={productQty}
                        onChange={(e) => handleQtyChange(product, e)}
                    />
                    шт.
                </td>
                <td className="product-cart__product-price">{itemTotalPrice} руб./шт.</td>
                <td className="product-cart__product-delete">
                    <button
                        className="product-cart__product-delete-button"
                        onClick={() => removeFromCart(product)}
                    >
                        Удалить
                    </button>
                </td>
            </tr>
        )
    }

    return (
        <div className="product-cart-container">
            <table className="product-cart">
                <tbody>
                <tr>
                    <th className="product-cart__name">Наименование товара и описание</th>
                    <th className="product-cart__name">Количество</th>
                    <th className="product-cart__name" colSpan="2">Цена</th>
                </tr>
                {cartProducts}
                </tbody>
            </table>
            <div className="product-cart-total">
                <h3 className="product-cart-total__value">Общая стоимость: {totalPrice} руб.</h3>
            </div>
        </div>
    );
}
