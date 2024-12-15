import { dbConnect } from "@/db/dbConnect";
import DEVICES from "@/db/models/DEVICES";
import EMP from "@/db/models/EMP";
import Add from "./Add";

export async function getList() {
	try {
		await dbConnect();
		const devices = await DEVICES.find({})
			.select("device_type -_id")
			.sort({ updatedAt: -1 });

		const emp = await EMP.find({})
			.select("employee_name -_id")
			.sort({ updatedAt: -1 });

		const data = JSON.parse(JSON.stringify({ devices, emp }));

		return { devices: data.devices, emp: data.emp };
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message || "Failed to get list");
		} else {
			throw new Error("Failed to get list");
		}
	}
}

// revalidate every 5 second

export const revalidate = 5;

export default async function Page() {
	const { devices, emp } = await getList();

	return <Add emp={emp} devices={devices} />;
}
