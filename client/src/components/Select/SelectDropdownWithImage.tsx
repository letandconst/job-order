import Select, { MultiValue } from 'react-select';
import { Image, Flex } from '@chakra-ui/react';
import { Products } from '../../context/DataContext';

interface Option {
	id: string;
	value: string;
	label: JSX.Element;
	price: number;
}
interface SelectDropdownProps {
	options: Products[];
	onChange: (newValue: MultiValue<Option>) => void;
	value: MultiValue<Option> | null;
}

const SelectDropdownWithImage = ({ options, value, onChange }: SelectDropdownProps) => {
	const formattedOptions = options.map((product) => ({
		value: product.name,
		label: (
			<Flex alignItems='center'>
				<Image
					src={product.productImage}
					boxSize='64px'
					mr={2}
				/>
				{`${product.name}`}
			</Flex>
		),
		price: product.price,
		id: product._id,
	}));

	return (
		<Select
			isMulti
			options={formattedOptions}
			value={value}
			onChange={onChange}
			isClearable
			placeholder='Select an item / part'
			noOptionsMessage={() => 'No matching options found'}
		/>
	);
};

export default SelectDropdownWithImage;
