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
import Button from '../../components/Button/Button';
import AddNewProduct from './modules/AddNewProduct';

const ProductsPage = () => {
	const { products, setProducts, showModal, setShowModal, showEditModal, setShowEditModal, showDeleteModal, setShowDeleteModal, handleCloseModal, selectedRow, setSelectedRow, api, setData } = useData();

	const handleAdd = async (addProduct: Products) => {
		try {
			const formData = new FormData();

			Object.entries(addProduct).forEach(([key, value]) => {
				if (key === 'image') {
					formData.append('productImage', value);
				} else {
					formData.append(key, value);
				}
			});

			await axios.post(`${api}/product/add`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			setData(addProduct);

			setShowEditModal(false);
		} catch (error) {
			console.error('Error updating:', error);
		}
	};

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

			setData(updatedProduct);
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
			<Box>
				<Button
					bgColor='green'
					onClick={() => setShowModal(true)}
				>
					Add New
				</Button>
				<Table
					columns={columns}
					data={products}
				/>
			</Box>
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

			<Modal
				modalTitle='Add New Item'
				isOpen={showModal}
				onClose={handleCloseModal}
			>
				<AddNewProduct
					onCancel={handleCloseModal}
					onAdd={handleAdd}
				/>
			</Modal>
		</>
	);
};

export default ProductsPage;
