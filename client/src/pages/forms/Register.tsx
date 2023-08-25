import { ChangeEvent, FormEvent, useState } from 'react';
import { Link as href, useNavigate } from 'react-router-dom';
import { Flex, Box, useToast, FormControl, InputGroup, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link } from '@chakra-ui/react';

import { BiShow, BiHide } from 'react-icons/bi';

import Input from '../../components/Input/Input';
import axios, { AxiosError } from 'axios';

const initialState = {
	fullName: '',
	username: '',
	email: '',
	password: '',
};

interface ErrorResponse {
	error: string;
}

const Register = () => {
	const history = useNavigate();
	const toast = useToast();

	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState(initialState);

	const { fullName, email, username, password } = user;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:5000/api/user/register', {
				fullName,
				username,
				email,
				password,
			});

			setUser({
				...user,
			});

			toast({
				position: 'top-right',
				title: res.data.message,
				status: 'success',
				duration: 1500,
			});

			setTimeout(() => {
				history('/login');
			}, 1600);

			setTimeout(() => {
				setUser({
					fullName: '',
					email: '',
					username: '',
					password: '',
				});
			}, 100);
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response && axiosError.response.data) {
				const responseData = axiosError.response.data as ErrorResponse;
				const message = responseData.error;

				toast({
					position: 'top-right',
					title: message,
					status: 'error',
					duration: 1500,
				});
			}
		}
	};

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack
				spacing={8}
				mx={'auto'}
				maxW={'lg'}
				py={12}
				px={6}
				width='100%'
			>
				<Stack align={'center'}>
					<Heading
						fontSize={{
							base: '4xs',
							sm: '2xl',
							md: '4xl',
						}}
						textAlign={'center'}
					>
						Create an Account
					</Heading>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<form onSubmit={handleSubmit}>
						<Stack spacing={4}>
							<FormControl id='fullName'>
								<Input
									label='Full Name'
									type='text'
									name='fullName'
									value={fullName}
									onChange={handleChange}
								/>
							</FormControl>
							<FormControl id='email'>
								<Input
									label='Email address'
									type='email'
									name='email'
									value={email}
									onChange={handleChange}
								/>
							</FormControl>
							<FormControl id='username'>
								<Input
									label='Username'
									type='text'
									name='username'
									value={username}
									onChange={handleChange}
								/>
							</FormControl>
							<FormControl id='password'>
								<InputGroup display='block'>
									<Input
										label='Password'
										type={showPassword ? 'text' : 'password'}
										name='password'
										value={password}
										onChange={handleChange}
									/>
									<InputRightElement top='32px'>
										<Button
											variant={'ghost'}
											onClick={() => setShowPassword((showPassword) => !showPassword)}
											minW='unset'
											height='40px'
											_hover={{
												bg: 'transparent',
											}}
										>
											{showPassword ? <BiShow /> : <BiHide />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>

							<Stack
								spacing={10}
								pt={2}
							>
								<Button
									type='submit'
									loadingText='Submitting'
									size='lg'
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}
								>
									Sign up
								</Button>
							</Stack>
							<Stack pt={6}>
								<Text align={'center'}>
									Already a user?{' '}
									<Link
										color={'blue.400'}
										as={href}
										to='/'
									>
										Login
									</Link>
								</Text>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Register;
