import { Button as ChakraButton } from '@chakra-ui/react';
import { type PropsWithChildren } from 'react';

interface ButtonProps {
	bgColor: string;
	textColor?: string;
	onClick?: () => void;
	type?: 'submit' | 'reset';
	disabled?:boolean;
}

const Button = ({ bgColor, textColor, disabled, children, onClick, type }: PropsWithChildren<ButtonProps>) => {
	return (
		<>
			<ChakraButton
				colorScheme={bgColor}
				textColor={textColor}
				onClick={onClick}
				type={type}
				isDisabled={disabled}
			>
				{children}
			</ChakraButton>
		</>
	);
};

export default Button;
