import { AlertDialog, AlertDialogFooter, AlertDialogContent, AlertDialogOverlay, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { BiAlarmExclamation } from 'react-icons/bi';

interface AlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	onDelete: () => void;
}

const AlertModal = ({ isOpen, onClose, onDelete }: AlertModalProps) => {
	const cancelRef = useRef(null);
	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<Flex
						flexDirection='column'
						alignItems='center'
						justifyContent='center'
						p={6}
					>
						<Icon
							as={BiAlarmExclamation}
							color='red.500'
							boxSize={10}
							mb={4}
						/>
						<Text
							fontSize='lg'
							fontWeight='bold'
							textAlign='center'
						>
							Are you sure?
						</Text>
						<Text
							mt={2}
							textAlign='center'
						>
							You won't be able to revert this!
						</Text>
					</Flex>

					<AlertDialogFooter
						justifyContent='center'
						mt={4}
					>
						<Button
							colorScheme='red'
							onClick={onDelete}
							variant='outline'
							mr={3}
						>
							Yes, delete it!
						</Button>
						<Button
							ref={cancelRef}
							onClick={onClose}
							variant='solid'
						>
							Cancel
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default AlertModal;
