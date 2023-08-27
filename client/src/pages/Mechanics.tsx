/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '../components/DataTable/Table';
import { mechanicsColumn } from '../components/DataTable/DataTableColumns/mechanicsColumn';
import { useData } from '../context/DataContext';
import ActionButton from '../components/DataTable/ActionButtons/ActionButton';
import Modal from '../components/Modal/Modal';
import axios from 'axios';
import AlertModal from '../components/Modal/AlertModal';

interface MechanicData {
	firstName: string;
	address: string;
	mobileNumber: string;
	profileImage: string;
	totalJobs: number;
}

const Mechanics = () => {
	const { mechanics, setMechanics, showEditModal, setShowEditModal, showDeleteModal, setShowDeleteModal, handleCloseModal, selectedRow, setSelectedRow, api } = useData();

	const handleShow = () => {
		console.log('show');
	};

	const handleEdit = (selected: MechanicData) => {
		setSelectedRow(selected);
		console.log(selected);
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

	const handleShowDelete = (selected: MechanicData) => {
		setSelectedRow(selected);
		setShowDeleteModal(true);
	};

	const columns = mechanicsColumn.map((column) => {
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
			<Table
				columns={columns}
				data={mechanics}
			/>
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
				<p>Edit Modal</p>
			</Modal>
		</>
	);
};

export default Mechanics;
