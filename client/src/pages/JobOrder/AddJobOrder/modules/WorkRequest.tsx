import { useEffect, useState } from 'react';
import { CheckboxGroup, Stack, Checkbox, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Box } from '@chakra-ui/react';

import { useData } from '../../../../context/DataContext';
import { useTotalAmountData } from '../../../../context/TotalAmountContext';
import { formatPrice } from '../../../../utils/helpers';

const WorkRequest = ({ formatServiceType }: { formatServiceType: (data: { request: string; labor: number }[]) => void }) => {
	const { serviceTypes } = useData();
	const { totalLabor, setTotalLabor } = useTotalAmountData();

	const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);

	const handleWorkRequestChange = (values: string[]) => {
		setSelectedServiceTypes(values);

		const formattedData: { request: string; labor: number }[] = values.map((value) => {
			const match = value.match(/\d+/);
			if (match) {
				const request = value.replace(/\d+/, '').trim();
				const labor = parseFloat(match[0]);
				return { request, labor };
			}

			return { request: '', labor: 0 };
		});

		formatServiceType(formattedData);
	};

	useEffect(() => {
		let sum = 0;
		if (selectedServiceTypes) {
			selectedServiceTypes.forEach((serviceType: string) => {
				const match = serviceType.match(/\d+/);
				const amount = match ? parseInt(match[0], 10) : 0;
				sum += amount;
			});
		}
		setTotalLabor(sum);
	}, [selectedServiceTypes, setTotalLabor]);

	return (
		<>
			<CheckboxGroup
				colorScheme='orange'
				value={selectedServiceTypes}
				onChange={handleWorkRequestChange}
			>
				<Stack spacing={[1, 5]}>
					{serviceTypes.map((type) => (
						<Checkbox
							key={type.name}
							value={type.name + ' ' + type.amount}
						>
							{type.name}
						</Checkbox>
					))}
				</Stack>
			</CheckboxGroup>
			{selectedServiceTypes && selectedServiceTypes.length > 0 ? (
				<TableContainer>
					<Table variant='striped'>
						<Thead>
							<Tr>
								<Th>Request</Th>
								<Th>Amount</Th>
							</Tr>
						</Thead>
						<Tbody>
							{selectedServiceTypes.map((serviceType, index) => {
								const match = serviceType.match(/\d+/);
								const amount = match ? match[0] : '0';
								const request = serviceType.replace(/\d+/, '').trim();

								return (
									<Tr key={index}>
										<Td>{request}</Td>
										<Td>{formatPrice(parseFloat(amount))}</Td>
									</Tr>
								);
							})}
						</Tbody>
						<Tfoot>
							<Tr>
								<Td>Total</Td>
								<Td>{formatPrice(totalLabor)}</Td>
							</Tr>
						</Tfoot>
					</Table>
				</TableContainer>
			) : (
				<Box fontWeight='900'>No selected request yet</Box>
			)}
		</>
	);
};

export default WorkRequest;
