import { Box, Button, Divider, Flex, FormControl } from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useData } from '../../../context/DataContext';
import { useTotalAmountData } from '../../../context/TotalAmountContext';
import { formatPrice } from '../../../utils/helpers';

import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';

import WorkRequest from './modules/WorkRequest';
import SelectedParts from './modules/SelectedParts';

interface AvailedParts {
	ProductID: string;
	Quantity: number;
}
interface WorkRequest {
	name: string;
	amount: number;
}

interface FormState {
	customerName: string;
	address: string;
	carModel: string;
	plateNumber: string;
	mobileNumber: string;
	assignedMechanic: string;
	products: AvailedParts[];
	workRequested: WorkRequest[];
	totalLabor: number;
	totalProductPrice: number;
	totalPrice: number;
	status: string;
}

const initialState: FormState = {
	customerName: '',
	address: '',
	carModel: '',
	plateNumber: '',
	mobileNumber: '',
	assignedMechanic: '',
	products: [],
	workRequested: [],
	totalLabor: 0,
	totalProductPrice: 0,
	totalPrice: 0,
	status: 'Pending',
};

const AddJobOrder = () => {
	const navigate = useNavigate();
	const { mechanicOptions, jobStatus, api, setData } = useData();
	const { totalLabor, totalProductPrice, setTotalPrice, totalPrice } = useTotalAmountData();

	const [newJobOrder, setNewJobOrder] = useState<FormState>(initialState);
	const [request, setRequest] = useState<WorkRequest[]>([]);
	const [availedParts, setAvailedParts] = useState<AvailedParts[]>([]);

	const handleFormatSelectedServiceType = (data: WorkRequest[]) => {
		setRequest(data);
	};

	const handleFormatSelectedParts = (data: AvailedParts[] | []) => {
		setAvailedParts(data);
	};

	// Handles the total amount of both request and parts
	useEffect(() => {
		const newTotalPrice = totalLabor + totalProductPrice;
		setTotalPrice(newTotalPrice);
	}, [totalLabor, totalProductPrice, setTotalPrice]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await axios.post(`${api}/job/add`, {
				...newJobOrder,
			});
			setData(newJobOrder);
			navigate('/job-orders');
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setNewJobOrder({
			...newJobOrder,
			[name]: value,
		});
	};

	useEffect(() => {
		setNewJobOrder((prevJobOrder) => ({
			...prevJobOrder,
			products: availedParts,
			workRequested: request,
			totalLabor: totalLabor,
			totalProductPrice: totalProductPrice,
			totalPrice: totalPrice,
		}));
	}, [totalLabor, totalProductPrice, totalPrice, request, availedParts]);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Box
					fontSize='36px'
					fontWeight='700'
					textTransform='uppercase'
				>
					Job Order Form
				</Box>
				<Flex gap='100px'>
					<Box
						width='100%'
						maxW='500px'
						sx={{
							'.chakra-form-control': {
								marginTop: '15px',
							},
						}}
					>
						<FormControl>
							<Input
								label='Customer Name'
								name='customerName'
								type='text'
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<Input
								label='Address'
								name='address'
								type='text'
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<Input
								label='Make'
								name='carModel'
								type='text'
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<Input
								label='Plate Number'
								name='plateNumber'
								type='text'
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<Input
								label='Mobile Number'
								name='mobileNumber'
								type='text'
								onChange={handleChange}
							/>
						</FormControl>
					</Box>
					<Box
						width='100%'
						maxW='500px'
						sx={{
							'.chakra-form-control': {
								marginTop: '15px',
							},
						}}
					>
						<FormControl>
							<Input
								label='Date'
								name='date'
								defaultValue={dayjs().format('MMMM, DD YYYY')}
								type='text'
							/>
						</FormControl>
						<FormControl>
							<Select
								label='Mechanic'
								onChange={handleChange}
								name='assignedMechanic'
								placeholder='Choose a mechanic...'
							>
								{mechanicOptions &&
									mechanicOptions.map((option, i) => (
										<option
											key={i}
											value={option.value}
										>
											{option.label}
										</option>
									))}
							</Select>
						</FormControl>
						<FormControl>
							<Select
								label='Status'
								onChange={handleChange}
								name='status'
							>
								{jobStatus &&
									jobStatus.map((option, i) => (
										<option
											key={i}
											value={option.value}
										>
											{option.value}
										</option>
									))}
							</Select>
						</FormControl>
					</Box>
				</Flex>
				<Divider
					my='32px'
					bg='#1e1e1e'
					opacity='1'
					py='1px'
				/>
				<Box
					fontSize='36px'
					fontWeight='700'
					textTransform='uppercase'
				>
					Work Request
				</Box>
				<Box>Select the necessary service type: </Box>
				<Flex
					w='100%'
					maxW='1280px'
					gap={{
						base: '50px',
						lg: '100px',
					}}
					sx={{
						'> div': {
							minW: '500px',
						},
					}}
					mt='24px'
					flexDir={{
						base: 'column',
						lg: 'row',
					}}
				>
					<WorkRequest formatServiceType={handleFormatSelectedServiceType} />
				</Flex>
				<Divider
					my='32px'
					bg='#1e1e1e'
					opacity='1'
					py='1px'
				/>
				<Box
					fontSize='36px'
					fontWeight='700'
					textTransform='uppercase'
				>
					Parts
				</Box>
				<SelectedParts formatSelectedParts={handleFormatSelectedParts} />
				<Divider
					my='32px'
					bg='#1e1e1e'
					opacity='1'
					py='1px'
				/>
				<Flex
					alignItems='flex-end'
					gap='32px'
					fontWeight='700'
					fontSize='24px'
					bg='#1e1e1e'
					color='#ffffff'
					p='24px'
					justifyContent='space-between'
				>
					<Box minW='max-content'>Total Amount: </Box>
					<Box>{formatPrice(totalPrice)}</Box>
				</Flex>
				<Button
					type='submit'
					mt='24px'
				>
					Create Job Order
				</Button>
			</form>
		</>
	);
};

export default AddJobOrder;
