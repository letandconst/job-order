/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import { useData } from '../../../../context/DataContext';
import { formatPrice } from '../../../../utils/helpers';

interface TabularDataProps {
	tableHeader: Array<string>;
	text: string;
	total: number;
	data: Array<any> | undefined;
}
const TabularData = ({ tableHeader, data, total, text }: TabularDataProps) => {
	const isTwoItems = tableHeader.length === 2;

	const { products } = useData();

	return (
		<Table
			variant='simple'
			mt='32px'
		>
			<Thead border='1px solid #e2e8f0'>
				<Tr>
					{isTwoItems ? (
						<Th
							borderRight='1px solid #e2e8f0'
							w='25%'
						></Th>
					) : (
						<Th borderRight='1px solid #e2e8f0'>{tableHeader[0]}</Th>
					)}
					<Th borderRight='1px solid #e2e8f0'>{tableHeader[isTwoItems ? 0 : 1]}</Th>
					<Th borderRight='1px solid #e2e8f0'>{tableHeader[isTwoItems ? 1 : 2]}</Th>
				</Tr>
			</Thead>
			<Tbody border='1px solid #e2e8f0'>
				{Array.from({ length: 15 }).map((_, rowIndex) => {
					const item = data?.[rowIndex] || {};
					const findProduct = products.find((product) => product._id === item.ProductID);

					let productPrice;
					if (typeof findProduct?.price !== 'undefined') {
						productPrice = formatPrice(findProduct?.price);
					}

					let totalLabor;

					if (typeof item?.labor !== 'undefined' && item.labor) {
						totalLabor = formatPrice(item.labor);
					}

					return (
						<Tr key={rowIndex}>
							{isTwoItems ? <Td borderRight='1px solid #e2e8f0'></Td> : <Td borderRight='1px solid #e2e8f0'>{item.Quantity}</Td>}
							<Td borderRight='1px solid #e2e8f0'>{isTwoItems ? item.request : findProduct?.name}</Td>
							<Td textAlign='right'>{isTwoItems ? totalLabor : productPrice}</Td>
						</Tr>
					);
				})}
				<Tr>
					<Td borderRight='1px solid #e2e8f0' />
					<Td borderRight='1px solid #e2e8f0'>
						<Box fontWeight='700'>{text}</Box>
					</Td>
					<Td>
						<Box
							fontWeight='700'
							textAlign='right'
						>
							{formatPrice(total)}
						</Box>
					</Td>
				</Tr>
			</Tbody>
		</Table>
	);
};

export default TabularData;
