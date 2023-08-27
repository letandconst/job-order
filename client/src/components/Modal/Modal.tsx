import { Modal as ChakraModal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import { type PropsWithChildren } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	modalTitle: string;
}

const Modal = ({ isOpen, onClose, modalTitle, children }: PropsWithChildren<ModalProps>) => {
	return (
		<ChakraModal
			isOpen={isOpen}
			onClose={onClose}
			size='4xl'
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{modalTitle ? modalTitle : 'Modal Header'}</ModalHeader>
				<ModalCloseButton />
				<ModalBody
					sx={{
						height: '100%',
						maxHeight: '700px',
						overflowY: 'scroll',
						padding: ' 0 20px 20px',
						'> div:not(:first-of-type), >div:not(:last-of-type)': {
							marginTop: '15px',
						},
					}}
				>
					{children || <Text>Modal Content</Text>}
				</ModalBody>
			</ModalContent>
		</ChakraModal>
	);
};

export default Modal;
