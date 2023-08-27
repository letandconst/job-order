import { FormLabel, Select as ChakraSelect } from '@chakra-ui/react';
import { ChangeEvent, type PropsWithChildren } from 'react';

interface SelectProps {
	onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
	value?: string;
	placeholder?: string;
	label: string;
	isDisabled?: boolean;
}

const Select = ({ onChange, value, children, placeholder, label, isDisabled }: PropsWithChildren<SelectProps>) => {
	return (
		<>
			<FormLabel>{label}</FormLabel>
			<ChakraSelect
				onChange={onChange}
				placeholder={placeholder}
				defaultValue={value}
				mt='0!important'
				isDisabled={isDisabled}
				sx={{
					':disabled': {
						opacity: '1',
						bg: '#dfe1e9',
					},
				}}
			>
				{children}
			</ChakraSelect>
		</>
	);
};

export default Select;
