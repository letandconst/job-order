import { Table, Thead, Tr, Th, Tbody, Td, Input } from '@chakra-ui/react';
import SelectDropdownWithImage from '../../../../components/Select/SelectDropdownWithImage';
import { Products, useData } from '../../../../context/DataContext';
import { useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import { formatPrice } from '../../../../utils/helpers';
import { useTotalAmountData } from '../../../../context/TotalAmountContext';

interface Option {
	id: string;
	value: string;
	label: JSX.Element;
	price: number;
}

const SelectedParts = ({ formatSelectedParts }: { formatSelectedParts: (data: { ProductID: string; Quantity: number }[]) => void }) => {
	const { products } = useData();
	const { totalProductPrice, setTotalProductPrice } = useTotalAmountData();

	const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option> | []>([]);
	const [rowTotalPrices, setRowTotalPrices] = useState<{ [key: string]: number }>({});
	const [quantityMap, setQuantityMap] = useState<{ [key: string]: number }>({});

	// Handle calculate price
	const calculateTotalPrice = (option: Products | Option, quantity: number) => {
		return option.price * quantity;
	};

	// Handle Parts Quantity
	const handleQuantityChange = (option: Option, newQuantity: number) => {
		newQuantity = Math.max(1, newQuantity);
		setQuantityMap((prevQuantityMap) => ({
			...prevQuantityMap,
			[option.value]: newQuantity,
		}));

		setRowTotalPrices((prevRowTotalPrices) => ({
			...prevRowTotalPrices,
			[option.value]: calculateTotalPrice(option, newQuantity),
		}));
	};

	// Set Initial Price for each row
	useEffect(() => {
		const initialRowTotalPrices: { [key: string]: number } = {};
		const initialQuantityMap: { [key: string]: number } = {};

		products.forEach((product) => {
			initialRowTotalPrices[product.name] = calculateTotalPrice(product, 1);
			initialQuantityMap[product.name] = 1;
		});

		setQuantityMap(initialQuantityMap);
		setRowTotalPrices(initialRowTotalPrices);
	}, [products]);

	// Compute total price of selected parts
	useEffect(() => {
		let newOverallTotalPrice = 0;

		if (selectedOptions) {
			selectedOptions.forEach((selectedOption) => {
				const { value } = selectedOption;
				const rowTotal = rowTotalPrices[value] || 0;
				newOverallTotalPrice += rowTotal;
			});
		}

		setTotalProductPrice(newOverallTotalPrice);
	}, [rowTotalPrices, selectedOptions, setTotalProductPrice]);

	// Handle select option
	const handleSelectChange = (newValue: MultiValue<Option>) => {
		setSelectedOptions(newValue);
	};

	const updateProductData = () => {
		const newData =
			selectedOptions &&
			selectedOptions.map((option) => ({
				ProductID: option.id,
				Quantity: quantityMap[option.value],
			}));
		formatSelectedParts(newData);
	};

	useEffect(() => {
		updateProductData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOptions, quantityMap]);

	return (
		<>
			<SelectDropdownWithImage
				options={products}
				onChange={handleSelectChange}
				value={selectedOptions}
			/>
			{selectedOptions && selectedOptions.length > 0 && (
				<Table
					variant='striped'
					mt='24px'
				>
					<Thead>
						<Tr>
							<Th>Parts Name</Th>
							<Th>Price</Th>
							<Th>Quantity</Th>
							<Th>Total Price</Th>
						</Tr>
					</Thead>
					<Tbody>
						{selectedOptions.map((selectedOption, index) => {
							const { value, price } = selectedOption;

							return (
								<Tr key={index}>
									<Td>{value}</Td>
									<Td>{price}</Td>
									<Td w='25%'>
										<Input
											maxW='max-content'
											type='number'
											value={quantityMap[value]}
											onChange={(e) => handleQuantityChange(selectedOption, +e.target.value)}
										/>
									</Td>
									<Td>{formatPrice(rowTotalPrices[value])}</Td>
								</Tr>
							);
						})}

						<Tr>
							<Td />
							<Td />
							<Td textAlign='right'>Total Amount</Td>
							<Td>{formatPrice(totalProductPrice)}</Td>
						</Tr>
					</Tbody>
				</Table>
			)}
		</>
	);
};

export default SelectedParts;
