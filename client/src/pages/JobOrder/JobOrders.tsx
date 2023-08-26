/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from 'react-router-dom';

import Table from '../../components/DataTable/Table';
import { jobOrdersColumn } from '../../components/DataTable/DataTableColumns/jobOrdersColumn';
import { useData } from '../../context/DataContext';
import ActionButton from '../../components/DataTable/ActionButtons/ActionButton';
import { ProductsData } from '../Products';

interface WorkRequested {
	request: string;
	labor: number;
}
interface JobOrdersData {
	customerName: string;
	address: string;
	carModel: string;
	plateNumber: string;
	mobileNumber: string;
	assignedMechanic: string;
	products: ProductsData[];
	workRequested: WorkRequested[];
	totalLabor: number;
	totalProductPrice: number;
	totalPrice: number;
	status: string;
}

const JobOrders = () => {
	const { jobOrders } = useData();
	const navigate = useNavigate();

	const handleShow = async (selectedId: string) => {
		navigate(`/job-orders/${selectedId}`);
	};

	const handleEdit = (selected: JobOrdersData) => {
		console.log(selected);
	};

	const handleDelete = (selected: JobOrdersData) => {
		console.log(selected);
	};

	const columns = jobOrdersColumn.map((column) => {
		if (column.Header === 'Actions') {
			return {
				...column,
				Cell: ({ row }: any) => (
					<ActionButton
						onView={() => handleShow(row.original._id)}
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
			data={jobOrders}
		/>
	);
};

export default JobOrders;
