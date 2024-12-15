export interface IP {
	_id: string;
	ip: string;
	location: string;
	device_type: string;
	added_by: string;
	notes?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface Employee {
	employee_name: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Device {
	device_type: string;
	createdAt: Date;
	updatedAt: Date;
}
