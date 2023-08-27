import { Input as ChakraInput, FormLabel } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface InputFieldProps {
	type: string;
	name: string;
	value?: string | number;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	defaultValue?: string | number;
	disabled?: boolean;
	placeholder?: string;
}

const Input = ({ type, name, value, onChange, label, defaultValue, disabled, placeholder }: InputFieldProps) => {
	return (
		<>
			<FormLabel>{label}</FormLabel>
			<ChakraInput
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				defaultValue={defaultValue}
				disabled={disabled}
				placeholder={placeholder ? placeholder : ''}
				autoComplete='off'
				sx={{
					':disabled': {
						opacity: '1',
						bg: '#dfe1e9',
					},
				}}
			/>
		</>
	);
};

export default Input;
