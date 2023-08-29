/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '../../components/DataTable/Table';
import { mechanicsColumn } from '../../components/DataTable/DataTableColumns/mechanicsColumn';
import { Mechanic, useData } from '../../context/DataContext';
import ActionButton from '../../components/DataTable/ActionButtons/ActionButton';
import Modal from '../../components/Modal/Modal';
import axios from 'axios';
import AlertModal from '../../components/Modal/AlertModal';
import { Box } from '@chakra-ui/react';
import Button from '../../components/Button/Button';
import AddNewMechanic from './modules/AddNewMechanic';
import UpdateMechanic from './modules/UpdateMechanic';

const Mechanics = () => {
	const { mechanics, setMechanics, showEditModal, setShowEditModal, showDeleteModal, setShowDeleteModal, handleCloseModal, selectedRow, setSelectedRow, api, showModal, setShowModal, setData } = useData();

	const handleAdd = async (addMechanic: Mechanic) => {
		try {
			const formData = new FormData();

			Object.entries(addMechanic).forEach(([key, value]) => {
				if (key === 'image') {
					formData.append('profileImage', value);
				} else {
					formData.append(key, value);
				}
			});

			 await axios.post(`${api}/mechanic/add`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			setData(addMechanic)
			
			setShowEditModal(false);
		} catch (error) {
			console.error('Error updating:', error);
		}
	};

	const handleEdit = async (updatedMechanic: Mechanic) => {
		try {
			const formData = new FormData();

			Object.entries(updatedMechanic).forEach(([key, value]) => {
				if (key === 'image') {
					formData.append('profileImage', value);
				} else {
					formData.append(key, value);
				}
			});

			await axios.put(`${api}/mechanic/${selectedRow._id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			setData(updatedMechanic);
			setShowEditModal(false);
		} catch (error) {
			console.error('Error updating:', error);
		}
	};

	const handleShowEdit = (selected: Mechanic) => {
		setSelectedRow(selected);
		setShowEditModal(true);
	};

	const handleDelete = async () => {
		try {
			await axios.delete(`${api}/mechanic/${selectedRow._id}`);
			setShowDeleteModal(false);

			const updatedMechanics = mechanics.filter((mechanic) => mechanic._id !== selectedRow._id);
			setMechanics(updatedMechanics);
		} catch (error) {
			console.log(error);
		}
	};

	const handleShowDelete = (selected: Mechanic) => {
		setSelectedRow(selected);
		setShowDeleteModal(true);
	};

	const columns = mechanicsColumn.map((column) => {
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
				Mechanics
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
				data={mechanics}
			/>
			</Box>
			
			<AlertModal
				isOpen={showDeleteModal}
				onClose={handleCloseModal}
				onDelete={handleDelete}
			/>
			<Modal
				modalTitle='Edit Mechanic'
				isOpen={showEditModal}
				onClose={handleCloseModal}
			>
				<UpdateMechanic
					selectedRow={selectedRow}
					onCancel={handleCloseModal}
					onUpdate={handleEdit}
				/>
			</Modal>

			<Modal
				modalTitle='Add Mechanic'
				isOpen={showModal}
				onClose={handleCloseModal}
			>
					<AddNewMechanic
					onCancel={handleCloseModal}
					onAdd={handleAdd}
				/>
			</Modal>
		</>
	);
};

export default Mechanics;
