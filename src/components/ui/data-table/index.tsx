"use client";
import { HStack, Input, Stack, Table } from "@chakra-ui/react";
import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
} from "@/components/ui/pagination";
import { Field } from "@/components/ui/field";
import { useState } from "react";

export type Column<T> = {
	header: string;
	accessorKey: keyof T;
	cell?: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
	data: T[];
	columns: Column<T>[];
	itemsPerPage?: number;
	actions?: {
		headerActions?: React.ReactNode;
		rowActions?: (item: T) => React.ReactNode;
		actionsLabel?: string;
	};
};

export function DataTable<T extends { id?: string; _id?: string }>({
	data,
	columns,
	itemsPerPage = 5,
	actions,
}: DataTableProps<T>) {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredItems = data.filter((item) =>
		Object.values(item).some((value) =>
			value
				?.toString()
				.trim()
				.toLowerCase()
				.includes(searchQuery.trim().toLowerCase())
		)
	);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

	const handlePageChange = (details: { page: number }) => {
		setCurrentPage(details.page);
	};

	return (
		<Stack width="full" gap="5">
			<HStack justify="space-between">
				<Field maxW="md">
					<Input
						placeholder="Search..."
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value);
							setCurrentPage(1);
						}}
						type="search"
					/>
				</Field>
				{actions?.headerActions}
			</HStack>

			<Table.Root striped colorScheme="teal">
				<Table.Header>
					<Table.Row>
						{columns.map((column) => (
							<Table.ColumnHeader key={String(column.accessorKey)}>
								{column.header}
							</Table.ColumnHeader>
						))}
						{actions?.rowActions && (
							<Table.ColumnHeader>
								{actions.actionsLabel || "Actions"}
							</Table.ColumnHeader>
						)}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{currentItems.map((item) => (
						<Table.Row key={item.id || item._id}>
							{columns.map((column) => (
								<Table.Cell key={String(column.accessorKey)}>
									{column.cell
										? column.cell(item)
										: (item[column.accessorKey] as string)}
								</Table.Cell>
							))}
							{actions?.rowActions && (
								<Table.Cell>{actions.rowActions(item)}</Table.Cell>
							)}
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>

			<PaginationRoot
				count={filteredItems.length}
				pageSize={itemsPerPage}
				page={currentPage}
				onPageChange={handlePageChange}
			>
				<HStack wrap="wrap" justify="center">
					<PaginationPrevTrigger />
					<PaginationItems />
					<PaginationNextTrigger />
				</HStack>
			</PaginationRoot>
		</Stack>
	);
}
