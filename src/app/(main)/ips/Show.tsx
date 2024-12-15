"use client";
import { IP } from "@/types";
export default function Show({ ip }: { ip: IP[] }) {
	return (
		<>
			<h1>IP</h1>
			{ip.map((item) => (
				<div key={item._id}>
					<p>{item.ip}</p>
					<p>{item?.location}</p>
					<p>{item.device_type}</p>
					<p>{item.location}</p>
					<p>{item.added_by}</p>
					<p>{item.notes}</p>
					<p>{item.createdAt?.toString()}</p>
					<p>{item.updatedAt?.toString()}</p>
				</div>
			))}
		</>
	);
}
