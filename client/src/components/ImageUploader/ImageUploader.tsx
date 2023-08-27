import { useState } from 'react';
import { Box, Image, Flex, Icon } from '@chakra-ui/react';
import { BiUpload } from 'react-icons/bi';

interface ImageUploaderProps {
	onImageUpload: (image: File) => void;
	currentImage?: File | string;
}

const ImageUploader = ({ onImageUpload, currentImage }: ImageUploaderProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			const imageUrl = URL.createObjectURL(selectedFile);
			setSelectedImage(imageUrl);
			onImageUpload(selectedFile);
		}
	};

	return (
		<Box
			w='100%'
			maxW='200px'
			height='200px'
			border='1px dashed #ccc'
			borderRadius='md'
			display='flex'
			justifyContent='center'
			alignItems='center'
			cursor='pointer'
			position='relative'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<>
				{!selectedImage && (
					<Image
						src={currentImage ? currentImage : '/image-placeholder.png'}
						w='100%'
						objectFit='contain'
						h='100%'
					/>
				)}

				{isHovered && (
					<Flex
						position='absolute'
						height='100%'
						justifyContent='center'
						alignItems='center'
						width='100%'
						fontSize='sm'
						color='#ffffff'
						flexDir='column'
						bg='rgba(30,30,30, 0.5)'
					>
						<Icon
							as={BiUpload}
							w='48px!important'
							h='48px!important'
						/>
						Upload Image
					</Flex>
				)}

				{selectedImage && (
					<img
						src={selectedImage}
						alt='Uploaded'
						style={{ maxWidth: '100%', maxHeight: '100%' }}
					/>
				)}

				<input
					type='file'
					accept='image/*'
					onChange={handleImageUpload}
					style={{
						display: 'block',
						width: '100%',
						height: '100%',
						opacity: 0,
						position: 'absolute',
						top: 0,
						left: 0,
						cursor: 'pointer',
					}}
				/>
			</>
		</Box>
	);
};

export default ImageUploader;
