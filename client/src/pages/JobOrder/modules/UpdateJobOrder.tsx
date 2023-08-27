import { Stack, Box, FormControl, Button } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';

import { JobOrder } from '../../../context/DataContext';
import { useData } from '../../../context/DataContext';

interface SelectedRowData {
	selectedRow: JobOrder;
}

const UpdateJobOrder = ({ selectedRow }: SelectedRowData) => {
	const { customerName, address, carModel, plateNumber, mobileNumber, assignedMechanic, createdAt, products, status, workRequested } = selectedRow;

	const { mechanics, mechanicOptions, jobStatus } = useData();

	const currentJobMechanic = mechanics.find((mechanic) => mechanic._id === assignedMechanic);

	return (
		<>
			<form>
				<Box
					sx={{
						'> .chakra-stack >.chakra-form-control': {
							marginTop: '15px',
						},
					}}
				>
					<Stack>
						<FormControl>
							<Input
								type='text'
								defaultValue={customerName}
								label='Customer Name'
								name='name'
								disabled={true}
							/>
						</FormControl>
						<FormControl>
							<Input
								type='text'
								defaultValue={address}
								label='Customer Address'
								name='address'
								disabled={true}
							/>
						</FormControl>
					</Stack>
					<Stack
						direction={{ base: 'column', sm: 'row' }}
						align={'start'}
						justify={'space-between'}
					>
						<FormControl>
							<Input
								type='text'
								defaultValue={carModel}
								label='Car Model'
								name='carModel'
								disabled={true}
							/>
						</FormControl>
						<FormControl>
							<Input
								type='text'
								defaultValue={plateNumber}
								label='Plate Number'
								name='plateNumber'
								disabled={true}
							/>
						</FormControl>
					</Stack>
					<Stack
						direction={{ base: 'column', sm: 'row' }}
						align={'start'}
						justify={'space-between'}
					>
						<FormControl>
							<Input
								type='text'
								defaultValue={dayjs(createdAt).format('MMMM, DD YYYY')}
								label='Date'
								name='createdAt'
								disabled={true}
							/>
						</FormControl>
						<FormControl>
							<Input
								type='text'
								defaultValue={mobileNumber}
								label='Telephone Number'
								name='mobileNumber'
								disabled={status === 'Completed' ? true : false}
							/>
						</FormControl>
					</Stack>
					<Stack>
						<FormControl>
							<Select
								label='Mechanic'
								onChange={(e) => console.log(e.target.value)}
								isDisabled={status === 'Completed' ? true : false}
								value={currentJobMechanic?._id}
							>
								{mechanicOptions &&
									mechanicOptions.map((option, i) => (
										<option
											key={i}
											value={option.value}
										>
											{option.label}
										</option>
									))}
							</Select>
						</FormControl>
					</Stack>
					<Stack>
						<FormControl>
							<Select
								label='Status'
								value={status}
								onChange={(e) => console.log(e.target.value)}
								isDisabled={status === 'Completed' ? true : false}
							>
								{jobStatus &&
									jobStatus.map((option, i) => (
										<option
											key={i}
											value={option.value}
										>
											{option.value}
										</option>
									))}
							</Select>
						</FormControl>
					</Stack>
				</Box>

				<Button type='submit'>Update</Button>
			</form>
		</>
	);
};

export default UpdateJobOrder;
