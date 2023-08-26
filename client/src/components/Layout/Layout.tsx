import { Link as href } from 'react-router-dom';
import { Avatar, Box, CloseButton, Flex, Icon, useColorModeValue, Link, Drawer, DrawerContent, useDisclosure, Image, MenuButton, HStack, Menu, MenuDivider, MenuItem, MenuList, CardBody, Card } from '@chakra-ui/react';

import { BiSolidDashboard, BiSolidWrench, BiTask, BiCube, BiMenu } from 'react-icons/bi';

interface Link {
	name: string;
	path: string;
	icon?: React.ElementType;
}

interface LinkGroup {
	groupName: string;
	links: Link[];
}

interface SidebarProps {
	onClose: () => void;
	display?: {
		base: string;
		md: string;
	};
}

const LinkGroups: LinkGroup[] = [
	{
		groupName: 'Main Navigation',
		links: [{ name: 'Dashboard', path: '/', icon: BiSolidDashboard }],
	},
	{
		groupName: 'Management Tools',
		links: [
			{ name: 'Job Orders', path: '/job-orders', icon: BiTask },
			{ name: 'Products', path: '/products', icon: BiCube },
			{ name: 'Mechanics', path: '/mechanics', icon: BiSolidWrench },
		],
	},
];

const SidebarContent = ({ onClose, display, ...rest }: SidebarProps) => {
	const currentUser = localStorage.getItem('user');

	const handleLogout = () => {
		localStorage.clear();
		window.location.href = '/';
	};
	return (
		<Flex
			transition='3s ease'
			bg='#1E1E1E'
			borderRight='1px'
			borderRightColor={useColorModeValue('gray.200', 'gray.500')}
			w={{ base: 'full', md: 60 }}
			pos='fixed'
			h='full'
			{...rest}
			display={display}
			color='#ffffff'
			justifyContent='space-between'
			flexDir='column'
		>
			<Box>
				<Flex
					h='20'
					alignItems='center'
					justifyContent='space-between'
					px={{ base: 4, md: 4 }}
				>
					<Image
						src='/logo.png'
						height='100%'
						mx={{
							base: '0',
							md: 'auto',
						}}
					/>

					<CloseButton
						display={{ base: 'flex', md: 'none' }}
						onClick={onClose}
					/>
				</Flex>
				<Box p={4}>
					{LinkGroups.map((group) => (
						<Box
							key={group.groupName}
							_notFirst={{
								marginTop: '32px',
							}}
							borderBottom='1px solid #ffffff'
							pb='16px'
						>
							<Box
								mx='4'
								textTransform='uppercase'
							>
								{group.groupName}
							</Box>
							<Box mt='12px'>
								{group.links.map((link) => (
									<Link
										key={link.name}
										as={href}
										to={link.path}
										style={{ textDecoration: 'none' }}
										_focus={{ boxShadow: 'none' }}
									>
										<NavItem icon={link.icon}>{link.name}</NavItem>
									</Link>
								))}
							</Box>
						</Box>
					))}
				</Box>
			</Box>
			<Flex
				width='100%'
				p='8px 16px'
			>
				<Menu>
					<MenuButton
						py={2}
						transition='all 0.3s'
						_focus={{ boxShadow: 'none' }}
					>
						<HStack>
							<Avatar
								size='md'
								src={'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'}
							/>
							<Box textAlign='left'>
								<Box fontSize='14px'>{currentUser && currentUser}</Box>
								<Box
									fontSize='10px'
									as='span'
								>
									ADMIN
								</Box>
							</Box>
						</HStack>
					</MenuButton>
					<MenuList
						bg='transparent'
						borderRadius='0'
						borderColor={useColorModeValue('gray.200', 'gray.700')}
						sx={{
							'.chakra-menu__menuitem': {
								bg: 'transparent',
							},
							'.chakra-menu__menuitem:hover': {
								bg: '#f8f9fd',
								color: '#1e1e1e',
							},
						}}
						minW='unset'
						width='208px'
					>
						<MenuItem>Profile</MenuItem>

						<MenuDivider />
						<MenuItem onClick={handleLogout}>Sign out</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</Flex>
	);
};

const NavItem = ({ icon, children, ...rest }: { icon?: React.ElementType; children: React.ReactNode }) => {
	return (
		<Flex
			align='center'
			p='12px'
			mx='4'
			borderRadius='0'
			role='group'
			cursor='pointer'
			_hover={{
				bg: '#f8f9fd',
				color: '#1e1e1e',
			}}
			{...rest}
		>
			{icon && (
				<Icon
					mr='4'
					fontSize='16'
					_groupHover={{
						color: '#000000',
					}}
					as={icon}
				/>
			)}
			{children}
		</Flex>
	);
};

const MobileNav = ({ onOpen, ...rest }: { onOpen: () => void }) => {
	return (
		<Flex
			className='mobile'
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height='20'
			bg='#1E1E1E'
			alignItems='center'
			borderBottomWidth='1px'
			borderBottomColor={useColorModeValue('gray.200', 'gray.500')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
			display={{
				base: 'flex',
				md: 'none',
			}}
		>
			<Image
				src='/logo.png'
				height='100%'
			/>
			<Icon
				cursor='pointer'
				fontSize='24px'
				color='#ffffff'
				as={BiMenu}
				onClick={onOpen}
			/>
		</Flex>
	);
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box
			minH='100vh'
			bg={useColorModeValue('white', 'gray.700')}
		>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: 'none', md: 'flex' }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box
				ml={{ base: 0, md: 60 }}
				p='4'
				sx={{
					'.chakra-card': {
						borderRadius: '0',
					},
				}}
			>
				<Card>
					<CardBody>{children}</CardBody>
				</Card>
			</Box>
		</Box>
	);
};

export default Layout;
