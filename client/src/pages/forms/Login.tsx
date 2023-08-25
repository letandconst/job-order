import { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate, Link as href } from 'react-router-dom';
import { Button, Flex, useToast, FormControl, Stack, useColorModeValue, Link, Heading, Box, Text } from '@chakra-ui/react';

import Input from '../../components/Input/Input';

const initialState = {
	username: '',
	password: '',
};

interface ErrorResponse {
	msg: string;
}

const Login = () => {
	const history = useNavigate();
	const toast = useToast();
	const [user, setUser] = useState(initialState);

	const { username, password } = user;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:5000/api/user/login', {
				username,
				password,
			});

			setUser({
				...user,
			});

			toast({
				position: 'top-right',
				title: res.data.msg,
				status: 'success',
				duration: 1500,
			});

			localStorage.setItem('isAuthenticated', 'true');
			localStorage.setItem('user', res.data.user.fullName);

			setTimeout(() => {
				history('/');
			}, 1600);
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response && axiosError.response.data) {
				const responseData = axiosError.response.data as ErrorResponse;
				const message = responseData.msg;

				toast({
					position: 'top-right',
					title: message,
					status: 'error',
					duration: 1500,
				});

				setTimeout(() => {
					setUser({
						username: '',
						password: '',
					});
				}, 1500);
			}
		}
	};

	return (
		<>
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
				>
					<Stack align={'center'}>
						<Heading
							fontSize={{
								base: '4xs',
								sm: '2xl',
								md: '4xl',
							}}
						>
							Sign in to your account
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
								<FormControl>
									<Input
										label='Username'
										type='text'
										name='username'
										value={username}
										onChange={handleChange}
									/>
								</FormControl>
								<FormControl>
									<Input
										label='Password'
										type='password'
										name='password'
										value={password}
										onChange={handleChange}
									/>
								</FormControl>
								<Stack spacing={4}>
									<Stack
										direction={{ base: 'column', sm: 'row' }}
										align={'start'}
										justify={'space-between'}
									>
										<Link color={'blue.400'}>Forgot password?</Link>
									</Stack>
									<Button
										type='submit'
										bg={'blue.400'}
										color={'white'}
										_hover={{
											bg: 'blue.500',
										}}
									>
										Sign in
									</Button>
								</Stack>
								<Stack pt={4}>
									<Text align={'center'}>
										Don't have account yet?{' '}
										<Link
											as={href}
											to='/register'
											color={'blue.400'}
										>
											Register
										</Link>
									</Text>
								</Stack>
							</Stack>
						</form>
					</Box>
				</Stack>
			</Flex>
		</>
	);
};

export default Login;
