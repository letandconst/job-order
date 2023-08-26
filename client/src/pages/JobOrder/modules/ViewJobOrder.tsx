/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router';
import { useData } from '../../../context/DataContext';

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Input } from '@chakra-ui/react';
import dayjs from 'dayjs';
import TabularData from './TabularData';

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

	const workRequestedTable = ['Work Requested', 'Amount'];
	const productsTable = ['Qty', 'Name', 'Amount'];

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
					<Flex
						gap='32px'
						mt='32px'
					>
						<Accordion
							allowToggle
							width='100%'
							defaultIndex={[0]}
						>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box
											as='span'
											flex='1'
											textAlign='left'
											fontWeight='700'
										>
											Work Requested
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									<TabularData
										tableHeader={workRequestedTable}
										text='Total Labor'
										total={currentJob.totalLabor}
										data={currentJob.workRequested}
									/>
								</AccordionPanel>
							</AccordionItem>

							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box
											as='span'
											flex='1'
											textAlign='left'
											fontWeight='700'
										>
											Availed Parts
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									<TabularData
										tableHeader={productsTable}
										text='Total'
										total={currentJob.totalProductPrice}
										data={currentJob.products}
									/>
								</AccordionPanel>
							</AccordionItem>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box
											as='span'
											flex='1'
											textAlign='left'
											fontWeight='700'
										>
											Total Charges
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									<Input
										placeholder='Basic usage'
										readOnly
										value={currentJob.totalPrice.toFixed(2)}
										textAlign='right'
										fontWeight='700'
									/>
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</Flex>
				</>
			) : (
				<p>Error fetching data</p>
			)}
		</>
	);
};

export default ViewJobOrder;
