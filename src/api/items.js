export function getItems({
    search = '',
    typeFilter = 11,
    sortBy = ''

}) {
    return fetch('items.json')
        .then(response => response.json())
        .then(data => {
            const filteredItems = data
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
                        const typeId = item.typeId;
                        if (typeFilter === typeId || typeFilter === 11) {
                            return true;
                        }
                        return null
                    }
                )
                .filter(
                    item => {
                        const weather = item.weather;
                        if (sortBy === '') return true
                        if (weather.includes(sortBy)) {
                            return true;
                        }
                        return null
                    }
                )

            return Promise.resolve(filteredItems);
        });
}
