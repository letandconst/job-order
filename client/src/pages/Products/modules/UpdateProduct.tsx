import { Box, Flex, FormControl, Textarea } from '@chakra-ui/react';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import { Products } from '../../../context/DataContext';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { ChangeEvent, FormEvent, useState } from 'react';

interface SelectedRowData {
	selectedRow: Products;
	onCancel: () => void;
	onUpdate: (updatedData: Products) => void;
}

const UpdateProduct = ({ selectedRow, onCancel, onUpdate }: SelectedRowData) => {
	const { name, description, price, stockQuantity, productImage } = selectedRow;

	const [updatedData, setUpdatedData] = useState(selectedRow);

	const handleImageUpload = (image: string) => {
		setUpdatedData((prevData) => ({
			...prevData,
			productImage: image,
		}));
	};

	const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setUpdatedData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onUpdate(updatedData);
		onCancel();
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Flex gap='32px'>
					<ImageUploader
						onImageUpload={handleImageUpload}
						currentImage={productImage}
					/>

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
								defaultValue={name}
								disabled={true}
								label='Item Name'
								name='name'
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<Textarea
								placeholder='Add a description...'
								defaultValue={description}
								size='md'
								name='description'
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<Input
								type='text'
								defaultValue={price}
								disabled={false}
								label='Item Price'
								name='price'
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<Input
								type='text'
								defaultValue={stockQuantity}
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
								Update
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
		</>
	);
};

export default UpdateProduct;
