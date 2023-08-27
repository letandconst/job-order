import { Button as ChakraButton } from '@chakra-ui/react';
import { type PropsWithChildren } from 'react';

interface ButtonProps {
	bgColor: string;
	textColor?: string;
	onClick?: () => void;
	type?: 'submit' | 'reset';
}

const Button = ({ bgColor, textColor, children, onClick, type }: PropsWithChildren<ButtonProps>) => {
	return (
		<>
			<ChakraButton
				colorScheme={bgColor}
				textColor={textColor}
				onClick={onClick}
				type={type}
			>
				{children}
			</ChakraButton>
		</>
	);
};

export default Button;
