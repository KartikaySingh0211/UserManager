import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import type { RootState, AppDispatch } from "../../app/store";
import { hideSnackbar } from "./uiSlice";

const AppSnackbar: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { open, message, severity } = useSelector(
		(state: RootState) => state.ui
	);

	const handleClose = () => {
		dispatch(hideSnackbar());
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={3000}
			onClose={handleClose}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
		>
			<Alert
				onClose={handleClose}
				severity={severity}
				variant="filled"
				sx={{ width: "100%" }}
			>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default AppSnackbar;
