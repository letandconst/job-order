import { HStack, IconButton } from '@chakra-ui/react';

import { BiPencil, BiTrash } from 'react-icons/bi';

interface ActionButtonsProps {
	onEdit: () => void;
	onDelete: () => void;
}

const ActionButton = ({ onEdit, onDelete }: ActionButtonsProps) => {
	return (
		<HStack spacing={4}>
			<IconButton
				onClick={onEdit}
				colorScheme='yellow'
				aria-label='Edit Details'
				icon={<BiPencil />}
			/>
			<IconButton
				onClick={onDelete}
				colorScheme='red'
				aria-label='Delete'
				icon={<BiTrash />}
			/>
		</HStack>
	);
};

export default ActionButton;
