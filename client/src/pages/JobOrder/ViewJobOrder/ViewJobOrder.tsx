/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router';
import { useData } from '../../../context/DataContext';

import { Text, Box, Flex, Divider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import TabularData from './modules/TabularData';
import { formatPrice } from '../../../utils/helpers';

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
			borderBottom='1px solid #1e1e1e'
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

	console.log(currentJob);

	const assignedMechanic = mechanics.find((mechanic) => mechanic._id === currentJob?.assignedMechanic);

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

	const allData = [
		{
			tableLabel: 'Work Requested',
			tableData: {
				header: ['Work Requested', 'Amount'],
				totalLabel: 'Total Labor',
				total: currentJob?.totalLabor,
				data: currentJob?.workRequested,
			},
		},
		{
			tableLabel: 'Availed Parts',
			tableData: {
				header: ['Qty', 'Name', 'Amount'],
				totalLabel: 'Total',
				total: currentJob?.totalProductPrice,
				data: currentJob?.products,
			},
		},
	];

	return (
		<>
			{currentJob ? (
				<>
					<Box
						fontSize='36px'
						fontWeight='700'
						textTransform='uppercase'
					>
						Job Order Details
					</Box>
					<Flex
						gap={{
							base: '0',
							xl: '100px',
						}}
						flexDir={{
							base: 'column',
							xl: 'row',
						}}
						mt='32px'
					>
						<Box
							w='100%'
							maxW={{
								base: '100%',
								xl: '500px',
							}}
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
							maxW={{
								base: '100%',
								xl: '350px',
							}}
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
					<Divider
						my='32px'
						bg='#1e1e1e'
						opacity='1'
						py='1px'
					/>
					<Flex
						flexDir={{
							base: 'column',
							xl: 'row',
						}}
						gap={{
							base: '32px',
							xl: '64px',
						}}
					>
						{allData &&
							allData.map((data, i) => (
								<Box
									key={i}
									_notFirst={{
										marginTop: {
											base: '32px',
											lg: '0',
										},
									}}
									w='100%'
								>
									<Text fontWeight='700'>{data.tableLabel}</Text>
									<TabularData
										tableHeader={data.tableData.header}
										text={data.tableData.totalLabel}
										total={data.tableData.total}
										data={data.tableData.data}
									/>
								</Box>
							))}
					</Flex>
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
						<Box>{formatPrice(currentJob.totalPrice)}</Box>
					</Flex>
				</>
			) : (
				<p>Error fetching data</p>
			)}
		</>
	);
};

export default ViewJobOrder;
