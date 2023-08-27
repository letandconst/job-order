/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '../components/DataTable/Table';
import { productsColumn } from '../components/DataTable/DataTableColumns/productsColumn';
import { useData } from '../context/DataContext';
import ActionButton from '../components/DataTable/ActionButtons/ActionButton';
import axios from 'axios';
import AlertModal from '../components/Modal/AlertModal';
import Modal from '../components/Modal/Modal';
import { Box } from '@chakra-ui/react';
export interface ProductsData {
	name: string;
	desription: string;
	price: number;
	productImage: string;
}

const Products = () => {
	const { products, setProducts, showEditModal, setShowEditModal, showDeleteModal, setShowDeleteModal, handleCloseModal, selectedRow, setSelectedRow, api } = useData();

	const handleShow = () => {
		console.log('show');
	};

	const handleEdit = (selected: ProductsData) => {
		setSelectedRow(selected);
		console.log(selected);
		setShowEditModal(true);
	};

	const handleDelete = async () => {
		try {
			await axios.delete(`${api}/product/${selectedRow._id}`);
			setShowDeleteModal(false);

			const updatedMechanics = products.filter((product) => product._id !== selectedRow._id);
			setProducts(updatedMechanics);
		} catch (error) {
			console.log(error);
		}
	};

	const handleShowDelete = (selected: ProductsData) => {
		setSelectedRow(selected);
		setShowDeleteModal(true);
	};

	const columns = productsColumn.map((column) => {
		if (column.Header === 'Actions') {
			return {
				...column,
				Cell: ({ row }: any) => (
					<ActionButton
						onView={() => handleShow}
						onEdit={() => handleEdit(row.original)}
						onDelete={() => handleShowDelete(row.original)}
					/>
				),
			};
		}
		return column;
	});

	return (
		<>
			<Box
				fontSize='36px'
				fontWeight='700'
				textTransform='uppercase'
			>
				Products
			</Box>
			<Table
				columns={columns}
				data={products}
			/>
			<AlertModal
				isOpen={showDeleteModal}
				onClose={handleCloseModal}
				onDelete={handleDelete}
			/>
			<Modal
				modalTitle='Edit Product'
				isOpen={showEditModal}
				onClose={handleCloseModal}
			>
				<p>Edit Modal</p>
			</Modal>
		</>
	);
};

export default Products;
