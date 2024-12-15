export const getDateTime = (): string => {
	const date = new Date();
	const day = date.toDateString();
	const time = date.toLocaleTimeString();
	return day + " " + time;
};

export const substring = (
	str: string | undefined | null,
	length: number
): string => {
	if ((str?.trim()?.length ?? 0) > length) {
		return (str ?? "").trim().substring(0, length);
	}
	return str?.trim() || "🤷‍♂️";
};

export interface DocumentWithTimestamps {
	createdAt: string | Date;
	updatedAt: string | Date;
	_doc: Record<string, never>;
}

export function convertDate(
	theDate: DocumentWithTimestamps[]
): DocumentWithTimestamps[] {
	theDate = theDate.map((ee) => {
		let CREATED = ee.createdAt;
		let UPDATED = ee.updatedAt;

		CREATED = convert(CREATED);
		UPDATED = convert(UPDATED);

		return { ...ee, createdAt: CREATED, updatedAt: UPDATED };

		function convert(e: string | Date): string {
			const date = new Date(e);
			const d = date.getDate() || "";
			const m = date.getMonth() + 1 || "";
			const y = date.getFullYear() || "";
			const h = date.getHours() || "";
			const min = date.getMinutes() || "";
			const s = date.getSeconds() || "";

			const tim = Number(h) > 12 ? "PM" : "AM";

			return `${y}/${m}/${d} _ ${h}:${min}:${s} ${tim}`;
		}
	});
	return theDate;
}

export function getLocalStorage(key: string): unknown {
	return JSON.parse(localStorage.getItem(key) || "null") || 0;
}

interface StorageInput {
	key: string;
	obj: never;
}

export function setLocalStorage({ key, obj }: StorageInput): void {
	if (typeof window !== "undefined") {
		localStorage.setItem(key, JSON.stringify(obj));
	}
}

export function clearLocalStorage(): void {
	if (typeof window !== "undefined") {
		localStorage.clear();
	}
}
