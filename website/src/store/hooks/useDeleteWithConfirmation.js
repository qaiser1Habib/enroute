import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

const useDeleteWithConfirmation = () => {
	const dispatch = useDispatch();

	const deleteWithConfirmation = async ({
		deleteAction,
		formData,
		afterDeleteAction,
		afterDeleteActionPayload,
		bypassAction = true,
		messageText,
	}) => {
		return Swal.fire({
			title: "Are you sure?",
			text: messageText || "Deleting this is a permanent action and cannot be undone.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel!",
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				return dispatch(deleteAction(formData))
					.then((response) => {
						if (response?.payload?.httpCode === 200 || response?.payload?._id || bypassAction) {
							Swal.fire({
								title: "Deleted!",
								text: "Record has been deleted.",
								icon: "success",
								showConfirmButton: false,
								timer: 1000,
							});

							// Perform any additional action if specified
							if (afterDeleteAction) {
								dispatch(afterDeleteAction(afterDeleteActionPayload));
							}

							return result; // Return result to notify the confirmation
						} else {
							throw new Error(response?.payload?.message || "There was an error deleting the record.");
						}
					})
					.catch((error) => {
						const errorMessage = error?.message || "There was an error deleting the record.";
						Swal.fire("Error", errorMessage, "error");
						throw error;
					});
			}

			return result;
		});
	};

	return deleteWithConfirmation;
};

export default useDeleteWithConfirmation;
