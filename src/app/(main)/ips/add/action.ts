"use server";
import { IP } from "@/types";

import { dbConnect } from "@/db/dbConnect";
import IPS from "@/db/models/IPS";

export async function addIp(data: FormData) {
	const newData: IP[] = [];

	newData.push({
		ip: data.get("ip") as string,
		location: data.get("location") as string,
		device_type: data.get("device_type") as string,
		added_by: data.get("added_by") as string,
		notes: data.get("notes") as string,
	});
	console.log(newData);
	try {
		await dbConnect();
		await IPS.create(newData);

		return true;
	} catch (error) {
		throw new Error((error as Error)?.message || "An unknown error occurred");
	}
}
