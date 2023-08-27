import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface Mechanic {
	_id: string;
	firstName: string;
	lastName: string;
	address: string;
	mobileNumber: string;
	profileImage: string;
	totalJobs: string;
}

interface Products {
	_id: string;
	name: string;
	description: string;
	price: number;
	stockQuantity: number;
	productImage: string;
}

interface SelectedProducts {
	ProductID: string;
	quantity: number;
}

interface WorkRequested {
	request: string;
	labor: number;
}

interface JobOrder {
	_id: string;
	customerName: string;
	address: string;
	carModel: string;
	plateNumber: string;
	mobileNumber: string;
	assignedMechanic: string;
	products: SelectedProducts[];
	workRequested: WorkRequested[];
	createdAt: string;
	status: string;
	totalLabor: number;
	totalProductPrice: number;
	totalPrice: number;
}

interface Option {
	value: string;
	label: string;
}

interface DataContextProps {
	children: ReactNode;
}

interface DataContextValues {
	mechanics: Mechanic[];
	jobOrders: JobOrder[];
	products: Products[];
	mechanicOptions: Option[];
	jobStatus: { label: number; value: string }[];
	api: string;
	handleCloseModal: () => void;
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Context = createContext<DataContextValues | undefined>(undefined);

const api = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react-refresh/only-export-components
export function useData() {
	const context = useContext(Context);
	if (!context) {
		throw new Error('useData must be used within a DataContextProvider');
	}
	return context;
}

const DataContext = ({ children }: DataContextProps) => {
	const [mechanics, setMechanics] = useState<Mechanic[]>([]);
	const [jobOrders, setJobOrders] = useState<JobOrder[]>([]);
	const [products, setProducts] = useState([]);
	const [mechanicOptions, setMechanicOptions] = useState<Option[]>([]);

	const [showModal, setShowModal] = useState(false);

	const handleCloseModal = () => setShowModal(false);

	const jobStatus = [
		{
			label: 1,
			value: 'Pending',
		},
		{
			label: 2,
			value: 'In-Progress',
		},
		{
			label: 3,
			value: 'Completed',
		},
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [mechanicsResponse, jobOrdersResponse, productsResponse] = await Promise.all([axios.get(`${api}/mechanic`), axios.get(`${api}/job`), axios.get(`${api}/product`)]);

				setMechanics(mechanicsResponse.data);

				setJobOrders(jobOrdersResponse.data);

				setProducts(productsResponse.data);

				const mechanicOptions = mechanicsResponse.data.map(({ _id, firstName }: Mechanic) => ({
					value: _id,
					label: firstName,
				}));

				setMechanicOptions(mechanicOptions);
			} catch (error) {
				console.error('Error:', error);
			}
		};

		fetchData();
	}, []);

	const contextValues: DataContextValues = {
		mechanics,
		jobOrders,
		products,
		mechanicOptions,
		jobStatus,
		api,
		showModal,
		setShowModal,
		handleCloseModal,
	};

	return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export default DataContext;
