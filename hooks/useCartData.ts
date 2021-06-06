import { useEffect, useReducer } from 'react';
import { Product } from "../api/CatalogAPI";

type CartActions =
    | { type: 'init', payload: CartState }
    | { type: 'update', payload: { product: Product } }
    | { type: 'remove', payload: { product: Product } }
    | { type: 'change', payload: { product: Product, value?: string } };

type ProductEntry = {
    product: Product;
    qty: number;
};

export type CartState = {
    [id: string]: ProductEntry;
};

export type CartData = {
    state: CartState;
    updateProduct: (productData: Product) => void;
    removeProduct: (productData: Product) => void;
    changeProductQty: (productData: Product, value: string) => void;
};

const initialState: CartState = {};

function reducer(state: CartState, action: CartActions) {
    switch (action.type) {
        case 'init':
            return {...action.payload};
        case 'update':
            const product = action.payload.product;
            if (state[product.id]) {
                return {
                    ...state,
                    [product.id]: {
                        product: product,
                        qty: (state[product.id].qty === product.qty)
                            ? product.qty
                            : state[product.id].qty + 1
                    }
                };
            } else {
                return {
                    ...state,
                    [action.payload.product.id]: {
                        product: action.payload.product,
                        qty: 1
                    }
                };
            }
        case 'remove':
            const updatedState = {...state};
            delete updatedState[action.payload.product.id];
            return updatedState;
        case 'change':
            return {
                ...state,
                [action.payload.product.id]: {
                    product: action.payload.product,
                    qty: parseInt(action.payload.value!)
                }
            };
        default:
            return state;
    }
}

export function useCartData(): CartData {
    const [state, dispatch] = useReducer(reducer, initialState);

    function updateProduct(productData: Product) {
        dispatch({type: 'update', payload: {product: productData}});
    }

    function removeProduct(productData: Product) {
        dispatch({type: 'remove', payload: {product: productData}});
    }

    function changeProductQty(productData: Product, value: string) {
        if (!value) {
            dispatch({type: 'remove', payload: {product: productData}});
            return;
        }
        dispatch({
            type: 'change',
            payload: {
                product: productData,
                value: parseInt(value) > productData.qty
                    ? productData.qty.toString()
                    : value
            }
        });
    }

    useEffect(() => {
        if (localStorage.getItem('cart-products')) {
            dispatch({type: 'init', payload: JSON.parse(localStorage.getItem('cart-products')!)});
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart-products', JSON.stringify(state));
    }, [state]);

    return {
        state,
        updateProduct,
        removeProduct,
        changeProductQty
    };
}
