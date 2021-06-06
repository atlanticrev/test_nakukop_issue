import { useState, useEffect } from 'react';
import { getCatalogData, ProductGroup } from "../api/CatalogAPI";

export type CatalogData = Array<ProductGroup>;

const INTERVAL_DATA_FETCHING = 15000;

export function useCatalogData(initialState: CatalogData = []): CatalogData {
    const [catalogData, setCatalogData] = useState(initialState);

    async function getCatalog() {
        const data = await getCatalogData();
        setCatalogData(data);
    }

    useEffect(() => {
        let intervalId = -1;
        getCatalog()
            .then(() => intervalId = window.setInterval(getCatalog, INTERVAL_DATA_FETCHING));
        return () => clearInterval(intervalId);
    }, []);

    return catalogData;
}
