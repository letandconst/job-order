import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import { Badge, Box, Card, CardBody } from '@chakra-ui/react';
import Select from '../components/Select/Select';

const ComponentsLibrary = () => {
	const components = [
		{
			name: 'Input Field',
			component: (
				<Input
					type='text'
					name='input'
					placeholder='Sample Input'
					label='Sample Label'
				/>
			),
		},
		{
			name: 'Button',
			component: (
				<Button
					bgColor='red'
					onClick={() => console.log('click')}
				>
					Button
				</Button>
			),
		},
		{
			name: 'Select',
			component: (
				<Select
					label='Select label'
					placeholder='Select an option...'
					onChange={() => console.log('change option')}
				>
					<option value='option 1'>Option 1</option>
					<option value='option 1'>Option 2</option>
					<option value='option 1'>Option 3</option>
				</Select>
			),
		},
	];
	return (
		<Box
			w='100%'
			padding='40px'
		>
			<Box fontSize='36px'>Components Library</Box>

			{components.map((item, i) => {
				return (
					<Card
						key={i}
						className='wrapper'
						w='100%'
						mt='24px'
					>
						<CardBody>
							<Badge
								variant='solid'
								colorScheme='green'
							>
								{item.name}
							</Badge>
							<Box mt='16px'>{item.component}</Box>
						</CardBody>
					</Card>
				);
			})}
		</Box>
	);
};

export default ComponentsLibrary;
