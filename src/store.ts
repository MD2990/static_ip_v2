import { proxy } from "valtio";
import { Device, Employee, IP } from "./types";

interface State {
	ips: IP[];
	emp: Employee[];
	device: Device[];
	searchTerm: string;
	searchResults: string[]; // Update this type based on your search results structure
	isDisabled: boolean;
	currentPage: number;
	PER_PAGE: number;
	offset: number;
	title: string;
	isDeleted: boolean;
	sortKey: string | null;
	empTotal: number;
	devicesTotal: number;
	deviceDefaultValue: string;
}

const state = proxy<State>({
	ips: [],
	emp: [],
	device: [],
	searchTerm: "",
	searchResults: [],
	isDisabled: false,
	currentPage: 0,
	PER_PAGE: 8,
	offset: 0,
	title: "",
	isDeleted: false,
	sortKey: null,
	empTotal: 0,
	devicesTotal: 0,
	deviceDefaultValue: "",
});

export default state;
