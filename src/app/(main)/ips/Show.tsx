"use client";
import { IP } from "@/types";
import { Stack, Button, HStack, IconButton } from "@chakra-ui/react";
import { DataTable, Column } from "@/components/ui/data-table";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function Show({ ip }: { ip: IP[] }) {
	const handleAdd = () => {
		// Implement add functionality
		console.log("Add new IP");
	};

	const handleEdit = (item: IP) => {
		// Implement edit functionality
		console.log("Edit IP:", item);
	};

	const handleDelete = (item: IP) => {
		// Implement delete functionality
		console.log("Delete IP:", item);
	};

	const columns: Column<IP>[] = [
		{ header: "IP Address", accessorKey: "ip" },
		{ header: "Location", accessorKey: "location" },
		{ header: "Device Type", accessorKey: "device_type" },
		{ header: "Added By", accessorKey: "added_by" },
		{ header: "Notes", accessorKey: "notes" },
		{
			header: "Created At",
			accessorKey: "createdAt",
			cell: (item) =>
				item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A",
		},
		{
			header: "Updated At",
			accessorKey: "updatedAt",
			cell: (item) =>
				item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "N/A",
		},
	];

	return (
		<Stack width="full" gap="5" p="4">
			<h1>IP Addresses</h1>
			<DataTable
				data={ip}
				columns={columns}
				actions={{
					headerActions: (
						<Button colorScheme="blue" onClick={handleAdd}>
							Add New IP
						</Button>
					),
					rowActions: (item) => (
						<HStack>
							<IconButton
								aria-label="Edit IP"
								size="sm"
								colorScheme="teal"
								onClick={() => handleEdit(item)}
							>
								<AiFillEdit />
							</IconButton>
							<IconButton
								aria-label="Delete IP"
								size="sm"
								colorScheme="red"
								onClick={() => handleDelete(item)}
							>
								<AiFillDelete />
							</IconButton>
						</HStack>
					),
					actionsLabel: "Edit/Delete",
				}}
			/>
		</Stack>
	);
}
