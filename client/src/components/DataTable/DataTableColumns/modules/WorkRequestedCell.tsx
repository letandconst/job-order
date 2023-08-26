import { Flex, Badge } from '@chakra-ui/react';

interface WorkRequestedProps {
	value: Array<{ request: string }>;
}

const WorkRequestedCell = ({ value }: WorkRequestedProps) => (
	<Flex
		gap='4px'
		flexDir={{
			base: 'column',
			md: 'row',
		}}
	>
		{value.map((item, i) => (
			<Badge
				key={i}
				variant='solid'
				colorScheme='green'
			>
				{item.request}
			</Badge>
		))}
	</Flex>
);

export default WorkRequestedCell;
