/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from 'react-router-dom';

import Table from '../../components/DataTable/Table';
import { jobOrdersColumn } from '../../components/DataTable/DataTableColumns/jobOrdersColumn';
import { useData } from '../../context/DataContext';
import ActionButton from '../../components/DataTable/ActionButtons/ActionButton';
import { JobOrder } from '../../context/DataContext';
import Modal from '../../components/Modal/Modal';
import UpdateJobOrder from './modules/UpdateJobOrder';
import AlertModal from '../../components/Modal/AlertModal';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import Button from '../../components/Button/Button';

const JobOrders = () => {
	const { jobOrders, showEditModal, setJobOrders, setShowEditModal, showDeleteModal, setShowDeleteModal, handleCloseModal, selectedRow, setSelectedRow, api } = useData();
	const navigate = useNavigate();

	const handleShow = async (selectedId: string) => {
		navigate(`/job-orders/${selectedId}`);
	};

	const handleEdit = (selected: JobOrder) => {
		setSelectedRow(selected);
		console.log(selected);
		setShowEditModal(true);
	};

	const handleDelete = async () => {
		try {
			await axios.delete(`${api}/job/${selectedRow._id}`);
			setShowDeleteModal(false);

			const updatedJobOrders = jobOrders.filter((order) => order._id !== selectedRow._id);
			setJobOrders(updatedJobOrders);
		} catch (error) {
			console.log(error);
		}
	};

	const handleShowDelete = (selected: JobOrder) => {
		setSelectedRow(selected);
		setShowDeleteModal(true);
	};

	const columns = jobOrdersColumn.map((column) => {
		if (column.Header === 'Actions') {
			return {
				...column,
				Cell: ({ row }: any) => (
					<ActionButton
						onView={() => handleShow(row.original._id)}
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
				Job Orders
			</Box>
			<Button
				bgColor='green'
				onClick={() => navigate(`/job-orders/add-new`)}
			>
				Add New
			</Button>
			<Table
				columns={columns}
				data={jobOrders}
			/>
			<AlertModal
				isOpen={showDeleteModal}
				onClose={handleCloseModal}
				onDelete={handleDelete}
			/>
			<Modal
				modalTitle='Edit Job Order'
				isOpen={showEditModal}
				onClose={handleCloseModal}
			>
				<UpdateJobOrder selectedRow={selectedRow} />
			</Modal>
		</>
	);
};

export default JobOrders;
