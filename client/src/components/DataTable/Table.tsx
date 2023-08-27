/* eslint-disable @typescript-eslint/no-explicit-any */

import { useTable, useSortBy, useFilters, usePagination, HeaderGroup, Cell, Row } from 'react-table';
import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td, Img, Box, Flex } from '@chakra-ui/react';

import { BiCaretUp, BiCaretDown } from 'react-icons/bi';

interface ColumnDefinition {
	Header: string;
	accessor?: string;
}

interface DataTableProps {
	columns: ColumnDefinition[];
	data: any[];
}

const Table = ({ columns, data }: DataTableProps) => {
	const tableInstance = useTable(
		{
			columns,
			data,
		},
		useFilters,
		useSortBy,
		usePagination
	);

	const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } = tableInstance;

	const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

	return (
		<Box
			overflowX={{
				base: 'scroll',
				xl: 'unset',
			}}
			mt='32px'
		>
			<ChakraTable
				variant='striped'
				{...getTableProps()}
			>
				<Thead>
					{headerGroups.map((headerGroup: HeaderGroup) => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column: any) => (
								<Th {...column.getHeaderProps(column.getSortByToggleProps())}>
									<Flex
										gap='4px'
										alignItems='center'
									>
										{column.render('Header')}
										{column.isSorted ? column.isSortedDesc ? <BiCaretDown /> : <BiCaretUp /> : ''}
									</Flex>
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{page.map((row: Row) => {
						prepareRow(row);
						return (
							<Tr {...row.getRowProps()}>
								{row.cells.map((cell: Cell) => {
									if (typeof cell.value === 'string' && imageExtensions.some((extension) => cell.value.includes(extension))) {
										return (
											<Td {...cell.getCellProps()}>
												<Img
													width='64px'
													src={cell.value}
													alt='Image'
												/>
											</Td>
										);
									} else if (typeof cell.value === 'number' && cell.column.Header === 'Price') {
										return <Td {...cell.getCellProps()}>{cell.value.toFixed(2)}</Td>;
									}

									return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
								})}
							</Tr>
						);
					})}
				</Tbody>
			</ChakraTable>
		</Box>
	);
};

export default Table;
