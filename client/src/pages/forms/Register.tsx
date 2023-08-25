import { useState } from 'react';
import { Link as href } from 'react-router-dom';
import { Flex, Box, FormControl, InputGroup, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link } from '@chakra-ui/react';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import Input from '../../components/Input/Input';

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
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
					<form>
						<Stack spacing={4}>
							<FormControl id='fullName'>
								<Input
									label='Full Name'
									type='text'
									name='fullName'
								/>
							</FormControl>
							<FormControl id='email'>
								<Input
									label='Email address'
									type='email'
									name='email'
								/>
							</FormControl>
							<FormControl id='username'>
								<Input
									label='Username'
									type='text'
									name='username'
								/>
							</FormControl>
							<FormControl id='password'>
								<InputGroup display='block'>
									<Input
										label='Password'
										type={showPassword ? 'text' : 'password'}
										name='password'
									/>
									<InputRightElement h={'108px'}>
										<Button
											variant={'ghost'}
											onClick={() => setShowPassword((showPassword) => !showPassword)}
										>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
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
