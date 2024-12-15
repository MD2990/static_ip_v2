import Swal from "sweetalert2";
import state from "@/store";

export async function handleFormDelete({
	handleDelete,
}: {
	handleDelete: () => void;
}) {
	await Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "error",
		cancelButtonColor: "#3085d6",
		showCancelButton: true,
		confirmButtonColor: "#d33",
		focusCancel: true,
		reverseButtons: true,
		confirmButtonText: "Yes, delete it!",
	}).then((result: { isConfirmed: unknown }) => {
		if (result.isConfirmed) {
			handleDelete();
			state.isDeleted = true;
		}
	});
}

export function successAlert(msg = "Deleted successfully") {
	Swal.fire({
		icon: "success",
		timerProgressBar: true,
		title: msg,
		showConfirmButton: false,
		timer: 2000,
	});
}

export function errorAlert(msg = "Something went wrong! Please try Again") {
	Swal.fire({
		icon: "error",
		title: "Oops...",
		text: msg,
		timer: 2000,
		timerProgressBar: true,
	});
}
