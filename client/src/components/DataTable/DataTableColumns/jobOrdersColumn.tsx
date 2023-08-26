import WorkRequestedCell from './modules/WorkRequestedCell';
import { useData } from '../../../context/DataContext';

export const jobOrdersColumn = [
	{
		Header: 'Customer Name',
		accessor: 'customerName' as const,
	},
	{
		Header: 'Car Model',
		accessor: 'carModel' as const,
	},
	{
		Header: 'Plate Number',
		accessor: 'plateNumber' as const,
	},
	{
		Header: 'Work Requested',
		accessor: 'workRequested' as const,
		Cell: ({ value }: { value: Array<{ request: string }> }) => <WorkRequestedCell value={value} />,
	},
	{
		Header: 'Mechanic',
		accessor: 'assignedMechanic',
		Cell: ({ value }: { value: string }) => {
			const { mechanics } = useData();
			const mechanicId = value;

			const assignedMechanic = mechanics.find((mechanic) => mechanic._id === mechanicId);

			if (assignedMechanic) {
				return <div>{assignedMechanic.firstName}</div>;
			}

			return null;
		},
	},
	{
		Header: 'Status',
		accessor: 'status' as const,
	},
	{
		Header: 'Actions',
	},
];
