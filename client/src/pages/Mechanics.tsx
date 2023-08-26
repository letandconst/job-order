/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '../components/DataTable/Table';
import { mechanicsColumn } from '../components/DataTable/DataTableColumns/mechanicsColumn';
import { useData } from '../context/DataContext';
import ActionButton from '../components/DataTable/ActionButtons/ActionButton';

interface MechanicData {
	firstName: string;
	address: string;
	mobileNumber: string;
	profileImage: string;
	totalJobs: number;
}

const Mechanics = () => {
	const { mechanics } = useData();

	const handleShow = () => {
		console.log('show');
	};

	const handleEdit = (selected: MechanicData) => {
		console.log(selected);
	};

	const handleDelete = (selected: MechanicData) => {
		console.log(selected);
	};

	const columns = mechanicsColumn.map((column) => {
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
			data={mechanics}
		/>
	);
};

export default Mechanics;
