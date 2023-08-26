/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router';
import { useData } from '../../context/DataContext';

import { Box, Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';

const Row = ({ label, index, value }: { label: string; index?: number; value: any }) => (
	<Flex
		direction='row'
		gap='8px'
		alignItems='center'
		flexWrap={{
			base: 'wrap',
			lg: 'unset',
		}}
		_notFirst={{
			marginTop: '12px',
		}}
		marginTop={{
			base: index === 0 ? '12px' : 'unset',
			lg: 'unset',
		}}
	>
		<Box
			className='label'
			flex={{ base: '1 0 100%', lg: '1 1 10px' }}
			fontWeight='700'
			fontSize='16px'
			padding='0 0 8px'
			textAlign='left'
		>
			{label}
		</Box>
		<Box
			className='value'
			flex={{ base: '1 0 100%', lg: '1 1 10px' }}
			borderBottom='1px solid #000000'
			padding='0 0 8px'
		>
			{value}
		</Box>
	</Flex>
);

const ViewJobOrder = () => {
	const path = useParams();
	const { jobOrders, mechanics } = useData();

	const currentJob = jobOrders.find((jobOrder) => jobOrder._id === path.id);

	const assignedMechanic = mechanics.find((mechanic) => mechanic._id === currentJob?.assignedMechanic);
	console.log('assigned', assignedMechanic);

	const customerDetails = [
		{ label: 'Customer Name', value: currentJob?.customerName },
		{ label: 'Address', value: currentJob?.address },
		{ label: 'Make', value: currentJob?.carModel },
		{ label: 'Plate Number', value: currentJob?.plateNumber },
		{ label: 'Mobile Number', value: currentJob?.mobileNumber },
		{ label: 'Date', value: dayjs(currentJob?.createdAt).format('MMMM, DD YYYY') },
		{ label: 'Mechanic', value: assignedMechanic?.firstName + ' ' + assignedMechanic?.lastName },
		{ label: 'Status', value: currentJob?.status },
	];

	return (
		<>
			{currentJob ? (
				<>
					<Flex
						gap={{
							base: '0',
							lg: '100px',
						}}
						flexDir={{
							base: 'column',
							lg: 'row',
						}}
					>
						<Box
							w='100%'
							maxW='500px'
						>
							{customerDetails.slice(0, -3).map((detail, index) => (
								<Row
									key={index}
									label={detail.label}
									value={detail.value}
								/>
							))}
						</Box>
						<Box
							w='100%'
							maxW='500px'
						>
							<Flex
								flexDir='column'
								height='100%'
								justifyContent='space-between'
							>
								{customerDetails.slice(-3, -2).map((detail, index) => (
									<Row
										key={index}
										index={index}
										label={detail.label}
										value={detail.value}
									/>
								))}
								<Box>
									{customerDetails.slice(-2).map((detail, index) => (
										<Row
											key={index}
											index={index}
											label={detail.label}
											value={detail.value}
										/>
									))}
								</Box>
							</Flex>
						</Box>
					</Flex>
				</>
			) : (
				// <p>Status: {status}</p>
				// 	<p>Total Labor: {totalLabor.toFixed(2)}</p>
				// 	<p>Total Price: {totalPrice.toFixed(2)}</p>
				// 	<p>Total Products: {totalProductPrice.toFixed(2)}</p>
				<p>Error fetching data</p>
			)}
		</>
	);
};

export default ViewJobOrder;
