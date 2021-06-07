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
        <div className="catalog-container">
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

            <style jsx>{`
                margin: 0 auto;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: flex-start;
            `}</style>
        </div>
    );
}
