export const baseItems = [
    {
        name: "Item 1",
        value: 1
    }, {
        name: "Item 2",
        value: 2
    }, {
        name: "Item Category 1",
        value: 3,
        category: "Cat 1"
    }, {
        name: "Item Category 2",
        value: 4,
        category: "Cat 1"
    }, {
        name: "Item Category 3",
        value: 5,
        category: "Cat 2"
    }
];

export function filterItemsByQuery(query: string) {
    const normalizedQuery = query.toLowerCase();
    if (normalizedQuery === "") {
        return baseItems;
    }
    return baseItems.filter((item) => item.name.toLowerCase().includes(normalizedQuery));
}
