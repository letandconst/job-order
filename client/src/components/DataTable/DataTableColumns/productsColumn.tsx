export const productsColumn = [
	{
		Header: 'Image',
		accessor: 'productImage' as const,
	},
	{
		Header: 'Name',
		accessor: 'name' as const,
	},
	{
		Header: 'Description',
		accessor: 'description' as const,
	},
	{
		Header: 'Price',
		accessor: 'price' as const,
	},
	{
		Header: 'Stocks',
		accessor: 'stockQuantity' as const,
	},
	{
		Header: 'Actions',
	},
];
