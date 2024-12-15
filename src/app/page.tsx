import { dbConnect } from "@/db/dbConnect";
import DEVICES from "@/db/models/DEVICES";
import EMP from "@/db/models/EMP";
import IPS from "@/db/models/IPS";
import Show from "../app/(main)/ips/Show";
import { Device, IP } from "@/types";

async function getData(): Promise<{
	ip: IP[];
	devices: Device[];
	empTotal: number;
	devicesTotal: number;
}> {
	try {
		await dbConnect();

		const ip = await IPS.find({}).sort({ updatedAt: -1 });
		// get devices number from Devices collection
		const devicesTotal = await DEVICES.find({}).countDocuments();
		const empTotal = await EMP.find({}).countDocuments();

		// get unique device types from the database using aggregation and count the number of each device type
		const devices = await IPS.aggregate([
			{
				$group: {
					_id: "$device_type",
					count: { $sum: 1 },
				},
			},
		]);

		const data = JSON.parse(
			JSON.stringify({ ip, devices, empTotal, devicesTotal })
		);

		return {
			ip: data.ip,
			devices: data.devices,
			empTotal: data.empTotal,
			devicesTotal: data.devicesTotal,
		};
	} catch (error) {
		throw new Error((error as Error)?.message || "An unknown error occurred");
	}
}

export default async function Page() {
	const { ip } = await getData();
	return <Show ip={ip} />;
}
