import React from 'react';
import CatalogGroup from "./CatalogGroup";
import { CartData } from "../hooks/useCartData";
import { CatalogData } from "../hooks/useCatalogData";

type ProductCatalogProps = {
    catalogData: CatalogData;
    cartData: CartData;
};

export default function Catalog({ catalogData, cartData }: ProductCatalogProps) {
    return (
        <>
            {
                catalogData.map(groupData =>
                    groupData.products.length
                        ? <CatalogGroup
                            key={groupData.id}
                            groupData={groupData}
                            cartData={cartData} />
                        : null
                )
            }
        </>
    );
}
