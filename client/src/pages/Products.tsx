/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '../components/DataTable/Table';
import { productsColumn } from '../components/DataTable/DataTableColumns/productsColumn';
import { useData } from '../context/DataContext';
import ActionButton from '../components/DataTable/ActionButtons/ActionButton';

export interface ProductsData {
	name: string;
	desription: string;
	price: number;
	productImage: string;
}

const Products = () => {
	const { products } = useData();

	const handleShow = () => {
		console.log('show');
	};

	const handleEdit = (selected: ProductsData) => {
		console.log(selected);
	};

	const handleDelete = (selected: ProductsData) => {
		console.log(selected);
	};

	const columns = productsColumn.map((column) => {
		if (column.Header === 'Actions') {
			return {
				...column,
				Cell: ({ row }: any) => (
					<ActionButton
						onView={() => handleShow}
						onEdit={() => handleEdit(row.original)}
						onDelete={() => handleDelete(row.original)}
					/>
				),
			};
		}
		return column;
	});

	return (
		<Table
			columns={columns}
			data={products}
		/>
	);
};

export default Products;
