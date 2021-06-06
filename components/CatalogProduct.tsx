import React from 'react';
import { Product } from "../api/CatalogAPI";
import { CartData } from "../hooks/useCartData";

type CatalogProductProps = {
    productData: Product;
    cartData: CartData;
};

export default function CatalogProduct({ productData, cartData }: CatalogProductProps) {
    return (
        <tr
            className="product"
            onClick={() => cartData.updateProduct(productData)}
        >
            <td className="product-name">{productData.name} ({productData.qty})</td>
            <td className="product-price">{productData.price} $</td>

            <style jsx>{`
                .product {
                    position: relative;
                    cursor: pointer;
                }
                
                .product:hover > * {
                    background-color: lightyellow;
                }
                
                .product:active > * {
                    background-color: lightgoldenrodyellow;
                }
                
                .product-name {
                    width: 85%;
                    text-align: left;
                }
                
                .product-price {
                    width: 15%;
                    text-align: right;
                    background-color: lightgray;
                    font-size: 1rem;
                    font-weight: bold;
                }
            `}</style>
        </tr>
    );
}
