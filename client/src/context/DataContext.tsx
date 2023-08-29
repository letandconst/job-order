/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

export interface Mechanic {
	_id?: string;
	firstName: string;
	lastName: string;
	address: string;
	mobileNumber: string;
	profileImage: string;
	totalJobs?: string;
}

export interface Products {
	_id?: string;
	name: string;
	description: string;
	price: number | undefined;
	stockQuantity: number | undefined;
	productImage: any;
}

interface SelectedProducts {
	ProductID: string;
	quantity: number;
}

export interface WorkRequested {
	request: string;
	labor: number;
}

export interface JobOrder {
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

export interface Option {
	value: string;
	label: string;
}

interface SelectedRow {
	[key: string]: any;
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
	showEditModal: boolean;
	setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
	showDeleteModal: boolean;
	setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
	selectedRow: any;
	setSelectedRow: React.Dispatch<React.SetStateAction<object>>;
	setJobOrders: React.Dispatch<React.SetStateAction<JobOrder[]>>;
	setMechanics: React.Dispatch<React.SetStateAction<Mechanic[]>>;
	setProducts: React.Dispatch<React.SetStateAction<Products[]>>;
	setData: React.Dispatch<React.SetStateAction<Products | Mechanic | null>>
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
	const [products, setProducts] = useState<Products[]>([]);
	const [mechanicOptions, setMechanicOptions] = useState<Option[]>([]);

	// State for getting the selected row from table
	const [selectedRow, setSelectedRow] = useState<SelectedRow | null>({});

	// State for showing / closing modal
	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const handleCloseModal = () => {
		setShowEditModal(false);
		setShowDeleteModal(false);
		setShowModal(false);
		setSelectedRow(null);
	};

	const [data, setData] = useState<Products | Mechanic |  null>(null)

	const jobStatus = [
		{
			label: 1,
			value: 'Pending',
		},
		{
			label: 2,
			value: 'In Progress',
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
	}, [data]);

	const contextValues: DataContextValues = {
		mechanics,
		setMechanics,
		jobOrders,
		setJobOrders,
		products,
		setProducts,
		mechanicOptions,
		jobStatus,
		api,
		showEditModal,
		setShowEditModal,
		showDeleteModal,
		setShowDeleteModal,
		handleCloseModal,
		selectedRow,
		setSelectedRow,
		showModal,
		setShowModal,
		setData
	};

	return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export default DataContext;
