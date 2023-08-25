import { FormLabel, Select as ChakraSelect } from '@chakra-ui/react';
import { type PropsWithChildren } from 'react';

interface SelectProps {
	onChange: () => void;
	value?: string;
	placeholder: string;
	label: string;
}

const Select = ({ onChange, value, children, placeholder, label }: PropsWithChildren<SelectProps>) => {
	return (
		<>
			<FormLabel>{label}</FormLabel>
			<ChakraSelect
				onChange={onChange}
				placeholder={placeholder}
				defaultValue={value}
				mt='0!important'
			>
				{children}
			</ChakraSelect>
		</>
	);
};

export default Select;
