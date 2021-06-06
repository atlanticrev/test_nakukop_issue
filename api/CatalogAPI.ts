export type ProductGroup = {
    name: string,
    id: string,
    products: Array<Product>
};

export type Product = {
    name: string,
    id: number,
    qty: number,
    price: number
};

const PRODUCT = {
    ID: 'T',
    GROUP_ID: 'G',
    QTY: 'P',
    PRICE: 'C',
    NAME: 'N'
};

const GROUP = {
    NAME: 'G',
    PRODUCTS: 'B'
};

async function requestCatalogData() {
    const responses = await Promise.all([
        window.fetch('/mock_data/names.json'),
        window.fetch('/mock_data/products.json')
    ]);
    return await Promise.all(responses.map(response => response.json()));
}

function processCatalogData(catalogData: any) {
    if (catalogData.length) {
        // Form product groups
        const [namesData, productsData] = catalogData;
        const catalogGroups: Array<ProductGroup> = [];
        for (let groupId of Object.keys(namesData)) {
            catalogGroups.push({
                name: namesData[groupId][GROUP.NAME],
                id: groupId,
                products: []
            });
        }
        // Form products list for each group
        for (let productData of productsData['Value']['Goods']) {
            const group = catalogGroups
                .find(group => group.id === productData[PRODUCT.GROUP_ID].toString());
            if (group) {
                group.products.push({
                    name: namesData[group.id][GROUP.PRODUCTS][productData[PRODUCT.ID]][PRODUCT.NAME],
                    id: productData[PRODUCT.ID],
                    qty: productData[PRODUCT.QTY],
                    price: productData[PRODUCT.PRICE]
                });
            }
        }
        return catalogGroups;
    }
    return [];
}

export function getCatalogData() {
    return requestCatalogData()
        .then(data => processCatalogData(data));
}
