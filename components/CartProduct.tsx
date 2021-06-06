import React from 'react';
import { Product } from "../api/CatalogAPI";
import { CartData } from "../hooks/useCartData";

type CartProductProps = {
    product: Product;
    productQtyInCart: number;
    itemTotalPrice: number;
    itemPriceCssClass: string;
    cartData: CartData;
};

export default function CartProduct({ product, productQtyInCart, itemTotalPrice, itemPriceCssClass, cartData }: CartProductProps) {
    return (
        <tr className="product" key={product.id}>
            <td className="product-name">{product.name}</td>
            <td className="product-qty">
                <input
                    className="product-qty-value"
                    type="number"
                    min={1}
                    max={product.qty}
                    value={productQtyInCart}
                    onChange={(e) => cartData.changeProductQty(product, e.target.value)}
                />
                шт.
                {productQtyInCart === product.qty && <p className="product-qty-limit">Количество ограничено</p>}
            </td>
            <td className={itemPriceCssClass}>{itemTotalPrice.toFixed(2)} руб./шт.</td>
            <td className="product-delete">
                <button
                    className="product-delete-button"
                    onClick={() => cartData.removeProduct(product)}
                >
                    Удалить
                </button>
            </td>

            <style jsx>{`
                .product-name {
                    width: 40%;
                }
                
                .product-qty {
                    width: 20%;
                }
                
                .product-price {
                    width: 30%;
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                
                .product-price.not-changed {
                    background-color: unset;
                }
                
                .product-price.increased {
                    background-color: indianred;
                }
                
                .product-price.decreased {
                    background-color: lightgreen;
                }
                
                .product-delete {
                    width: 10%;
                    text-align: center;
                }
                
                .product-delete-button {
                    padding: 10px 20px;
                    border-radius: 5px;
                    background-color: lightgray;
                    cursor: pointer;
                }
                
                .product-qty-value {
                    width: 80px;
                    padding: 5px;
                    margin-right: 5px;
                    border: 1px solid lightgray;
                    font-size: 1rem;
                }
                
                .product-qty-limit {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 50%;
                    padding: 10px;
                    font-size: 0.75rem;
                    text-align: center;
                    margin-top: 5px;
                    color: orangered;
                    background-color: wheat;
                    border: 1px dashed orangered;
                }
            `}</style>
        </tr>
    );
}
