import { Link as href } from 'react-router-dom';
import { Button, Flex, FormControl, Stack, useColorModeValue, Link, Heading, Box, Text } from '@chakra-ui/react';

import Input from '../../components/Input/Input';

const Login = () => {
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
						<form>
							<Stack spacing={4}>
								<FormControl>
									<Input
										label='Username'
										type='text'
										name='username'
									/>
								</FormControl>
								<FormControl>
									<Input
										label='Password'
										type='password'
										name='password'
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
