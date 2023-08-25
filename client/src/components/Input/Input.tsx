import { Input as ChakraInput, FormLabel } from '@chakra-ui/react';

interface InputFieldProps {
	type: string;
	name: string;
	value?: string | number;
	onChange?: () => void;
	label: string;
	defaultValue?: string | number;
	isReadOnly?: boolean;
	placeholder?: string;
}

const Input = ({ type, name, value, onChange, label, defaultValue, isReadOnly, placeholder }: InputFieldProps) => {
	return (
		<>
			<FormLabel>{label}</FormLabel>
			<ChakraInput
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				defaultValue={defaultValue}
				isReadOnly={isReadOnly}
				placeholder={placeholder ? placeholder : ''}
				autoComplete='off'
			/>
		</>
	);
};

export default Input;
