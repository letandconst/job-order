import { Button as ChakraButton } from '@chakra-ui/react';
import { type PropsWithChildren } from 'react';

interface ButtonProps {
	bgColor: string;
	textColor?: string;
	onClick: () => void;
}

const Button = ({ bgColor, textColor, children, onClick }: PropsWithChildren<ButtonProps>) => {
	return (
		<>
			<ChakraButton
				colorScheme={bgColor}
				textColor={textColor}
				onClick={onClick}
			>
				{children}
			</ChakraButton>
		</>
	);
};

export default Button;
