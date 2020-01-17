export function getItems({
    search = '',
    // type
    typeFilter = 'all',
    //kategory
    sortBy = 'name',

}) {
    return fetch('items.json')
        .then(response => response.json())
        .then(data => {
            const filteredItems = data
                .filter(
                    item => {
                        if (typeFilter === 'all') {
                            return true;
                        }
                        return item.typeId === typeFilter;
                    },
                )
                .filter(
                    item => {
                        const itemName = item.name.toLowerCase();
                        return (
                            itemName.includes(search)
                        );
                    },
                )
                .filter(
                    item => {
                        if (typeFilter === 'all') return true;

                        return item.type === typeFilter;
                    }
                )

            const sortedItems =
                filteredItems.sort((a, b) => {
                    const sA = a[sortBy];
                    const sB = b[sortBy];
                    if (typeof sA === 'string') {
                        return sA.localeCompare(sB);
                    } else {
                        return sA - sB;
                    }
                });

            return Promise.resolve(sortedItems);
        });
}
