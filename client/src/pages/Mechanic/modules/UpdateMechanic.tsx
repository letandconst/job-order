import { Box, Flex, FormControl, Divider } from '@chakra-ui/react';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import { Mechanic } from '../../../context/DataContext';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { ChangeEvent, FormEvent, useState } from 'react';
import ViewJobs from './ViewJobs';

interface SelectedRowData {
	selectedRow: Mechanic;
	onCancel: () => void;
	onUpdate: (updatedData: Mechanic) => void;
}

const UpdateMechanic = ({ selectedRow, onCancel, onUpdate }: SelectedRowData) => {

	const { _id, firstName, lastName, address, mobileNumber, profileImage} = selectedRow;

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
						 currentImage={profileImage}
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
								defaultValue={firstName + ' ' + lastName}
								disabled={true}
								label='Full Name'
								name='name'
								onChange={handleChange}
							/>
						</FormControl>
						
						<FormControl>
							<Input
								type='text'
								defaultValue={address}
								disabled={false}
								label='Address'
								name='address'
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<Input
								type='text'
								defaultValue={mobileNumber}
								disabled={false}
								label='Mobile Number'
								name='mobileNumber'
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
			<Divider
						my='32px'
						bg='#1e1e1e'
						opacity='1'
						py='1px'
					/>
			<ViewJobs id={_id}/>
		</>
	);
};

export default UpdateMechanic;
