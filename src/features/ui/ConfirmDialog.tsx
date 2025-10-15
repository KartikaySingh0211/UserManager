import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";

interface ConfirmDialogProps {
	open: boolean;
	title?: string;
	message?: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
	open,
	title = "Confirm Action",
	message = "Are you sure you want to continue?",
	confirmText = "Confirm",
	cancelText = "Cancel",
	onConfirm,
	onCancel,
}) => {
	return (
		<Dialog open={open} onClose={onCancel}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel} color="inherit" variant="outlined">
					{cancelText}
				</Button>
				<Button onClick={onConfirm} color="error" variant="contained">
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
