/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '../../components/DataTable/Table';
import { productsColumn } from '../../components/DataTable/DataTableColumns/productsColumn';
import { Products, useData } from '../../context/DataContext';
import ActionButton from '../../components/DataTable/ActionButtons/ActionButton';
import axios from 'axios';
import AlertModal from '../../components/Modal/AlertModal';
import Modal from '../../components/Modal/Modal';
import { Box } from '@chakra-ui/react';
import UpdateProduct from './modules/UpdateProduct';

const ProductsPage = () => {
	const { products, setProducts, showEditModal, setShowEditModal, showDeleteModal, setShowDeleteModal, handleCloseModal, selectedRow, setSelectedRow, api, updateProduct } = useData();

	const handleEdit = async (updatedProduct: Products) => {
		try {
			const formData = new FormData();

			Object.entries(updatedProduct).forEach(([key, value]) => {
				if (key === 'image') {
					formData.append('productImage', value);
				} else {
					formData.append(key, value);
				}
			});

			await axios.put(`${api}/product/${selectedRow._id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			updateProduct(updatedProduct);
			setShowEditModal(false);
		} catch (error) {
			console.error('Error updating:', error);
		}
	};

	const handleShowEdit = (selected: Products) => {
		setSelectedRow(selected);
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

	const handleShowDelete = (selected: Products) => {
		setSelectedRow(selected);
		setShowDeleteModal(true);
	};

	const columns = productsColumn.map((column) => {
		if (column.Header === 'Actions') {
			return {
				...column,
				Cell: ({ row }: any) => (
					<ActionButton
						onEdit={() => handleShowEdit(row.original)}
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
				modalTitle='Edit Item'
				isOpen={showEditModal}
				onClose={handleCloseModal}
			>
				<UpdateProduct
					selectedRow={selectedRow}
					onCancel={handleCloseModal}
					onUpdate={handleEdit}
				/>
			</Modal>
		</>
	);
};

export default ProductsPage;
