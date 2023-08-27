import { Flex, FormControl, Textarea, Box } from '@chakra-ui/react';

import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Products } from '../../../context/DataContext';

interface AddNewProps {
	onCancel: () => void;
	onAdd: (addNewProduct: Products) => void;
}

const AddNewProduct = ({ onCancel, onAdd }: AddNewProps) => {
	const [newProduct, setNewProduct] = useState<Products>({
		name: '',
		description: '',
		price: 0,
		stockQuantity: 0,
		productImage: '',
	});

	const handleImageUpload = (image: File) => {
		console.log('Image uploaded:', image);

		setNewProduct((prevData) => ({
			...prevData,
			productImage: image,
		}));
	};

	const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setNewProduct((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onAdd(newProduct);
		console.log(newProduct);
		onCancel();
	};

	return (
		<form onSubmit={handleSubmit}>
			<Flex gap='32px'>
				<ImageUploader onImageUpload={handleImageUpload} />

				<Box
					width='100%'
					sx={{
						'> div:not(:first-of-type)': {
							marginTop: '16px',
						},
					}}
				>
					<FormControl>
						<Input
							type='text'
							label='Item Name'
							name='name'
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl>
						<Textarea
							placeholder='Add a description...'
							size='md'
							name='description'
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl>
						<Input
							type='text'
							disabled={false}
							label='Item Price'
							name='price'
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl>
						<Input
							type='text'
							disabled={false}
							label='Item Stocks'
							name='stockQuantity'
							onChange={handleChange}
						/>
					</FormControl>
					<Flex gap='8px'>
						<Button
							bgColor='green'
							type='submit'
						>
							Add
						</Button>
						<Button
							bgColor='gray'
							onClick={onCancel}
						>
							Cancel
						</Button>
					</Flex>
				</Box>
			</Flex>
		</form>
	);
};

export default AddNewProduct;
