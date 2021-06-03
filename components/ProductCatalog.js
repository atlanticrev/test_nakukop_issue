import React from 'react';

export default function ProductCatalog({ data, addToCart }) {

    return (
        <>
            {
                data.map(group =>
                    group.products.length ? (
                        <table className="product-group" key={group.id}>
                            <tbody>
                                <tr>
                                    <th className="product-group__name" colSpan="2">{group.name}</th>
                                </tr>
                                {
                                    group.products.map(product =>
                                        <tr className="product-group__product" key={product.id} onClick={() => addToCart(product)}>
                                            <td className="product-group__product-name">{product.name} ({product.qty})</td>
                                            <td className="product-group__product-price">{product.price}$</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    ) : null
                )
            }
        </>
    );
}
