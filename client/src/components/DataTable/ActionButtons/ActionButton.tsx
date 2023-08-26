import { HStack, IconButton } from '@chakra-ui/react';

import { BiShowAlt, BiPencil, BiTrash } from 'react-icons/bi';

interface ActionButtonsProps {
	onView: () => void;
	onEdit: () => void;
	onDelete: () => void;
}

const ActionButton = ({ onView, onEdit, onDelete }: ActionButtonsProps) => {
	return (
		<HStack spacing={4}>
			<IconButton
				onClick={onView}
				colorScheme='green'
				aria-label='View Details'
				icon={<BiShowAlt />}
			/>
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
