import React from 'react';
import CatalogProduct from "./CatalogProduct";
import { CartData } from "../hooks/useCartData";
import { ProductGroup } from "../api/CatalogAPI";

type CatalogGroupProps = {
    groupData: ProductGroup;
    cartData: CartData
};

export default function CatalogGroup({ groupData, cartData }: CatalogGroupProps) {
    return (
        <table className="product-group">
            <tbody>
                <tr className="product-group__header">
                    <th
                        className="product-group__name"
                        colSpan={2}
                    >
                        {groupData.name}
                    </th>
                </tr>
                {
                    groupData.products.map(productData =>
                        <CatalogProduct
                            key={productData.id}
                            productData={productData}
                            cartData={cartData}
                        />
                    )
                }
            </tbody>

            <style jsx>{`
                .product-group {
                    width: 600px;
                    padding: 10px;
                    margin: 5px;
                    border: 1px solid lightgray;
                    border-collapse: collapse;
                }
                
                .product-group__name {
                    text-align: left;
                    font-size: 1rem;
                    padding: 15px 20px;
                }
            `}</style>
        </table>
    );
}
