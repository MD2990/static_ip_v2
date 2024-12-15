"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createListCollection, Input, VStack } from "@chakra-ui/react";
import { addIp } from "./action";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import {
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
} from "@/components/ui/select";
import { Device, Employee } from "@/types";

interface FormValues {
	ip: string;
	location: string;
	device_type: string;
	added_by: string;
	notes?: string;
}

const schema = z.object({
	ip: z.string().ip("Invalid IP address"),
	location: z.string().min(1, "Location is required"),
	device_type: z.string().min(1, "Device type is required"),
	added_by: z.string().min(1, "Added by is required"),
	notes: z.string().optional(),
});

export default function Add({
	emp,
	devices,
}: {
	emp: Employee[];
	devices: Device[];
}) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			notes: "No Notes",
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			const formData = new FormData();
			Object.entries(data).forEach(([key, value]) => {
				if (value) formData.append(key, value);
			});

			const result = await addIp(formData);
			if (result) {
				toaster.create({ description: "IP added successfully" });
			}
		} catch (error) {
			toaster.create({
				description:
					error instanceof Error ? error.message : "Failed to add IP",
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<VStack align="stretch" p="4">
				<Field
					label="IP Address"
					invalid={!!errors.ip}
					errorText={errors.ip?.message}
				>
					<Input {...register("ip")} />
				</Field>

				<Field
					label="Location"
					invalid={!!errors.location}
					errorText={errors.location?.message}
				>
					<Input {...register("location")} />
				</Field>

				<Field
					label="Device Type"
					invalid={!!errors.device_type}
					errorText={errors.device_type?.message}
				>
					<SelectRoot
						{...register("device_type")}
						collection={createListCollection({
							items: devices.map((device, i) => ({
								label: device.device_type,
								value: device.device_type,
								key: i,
							})),
						})}
					>
						<SelectLabel>
							<SelectTrigger>
								<SelectValueText placeholder="Select device type" />
							</SelectTrigger>
							<SelectContent>
								{devices?.map((device, i) => (
									<SelectItem key={i} item={device.device_type}>
										{device.device_type}
									</SelectItem>
								))}
							</SelectContent>
						</SelectLabel>
					</SelectRoot>
				</Field>

				<Field
					label="Added By"
					invalid={!!errors.added_by}
					errorText={errors.added_by?.message}
				>
					<SelectRoot
						{...register("added_by")}
						collection={createListCollection({
							items: emp.map((employee, i) => ({
								label: employee.employee_name,
								value: employee.employee_name,
								key: i,
							})),
						})}
					>
						<SelectLabel>
							<SelectTrigger>
								<SelectValueText placeholder="Select employee" />
							</SelectTrigger>
							<SelectContent>
								{emp?.map((employee, i) => (
									<SelectItem key={i} item={employee.employee_name}>
										{employee.employee_name}
									</SelectItem>
								))}
							</SelectContent>
						</SelectLabel>
					</SelectRoot>
				</Field>

				<Field
					label="Notes"
					invalid={!!errors.notes}
					errorText={errors.notes?.message}
				>
					<Input {...register("notes")} />
				</Field>

				<Button mt={4} colorScheme="blue" loading={isSubmitting} type="submit">
					Add IP
				</Button>
			</VStack>
		</form>
	);
}
