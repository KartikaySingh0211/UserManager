import React, { useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
	CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddUserMutation, useUpdateUserMutation } from "../usersApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import { showSnackbar } from "../../ui/uiSlice";
import type { User } from "../types";

interface Props {
	open: boolean;
	setOpen: (open: boolean) => void;
	editingUser: User | null;
	setEditingUser: (user: User | null) => void;
}

const schema = z.object({
	name: z.string().nonempty("Name is required"),
	username: z.string().nonempty("Username is required"),
	email: z.string().email("Invalid email").nonempty("Email is required"),
});

type FormData = z.infer<typeof schema>;

const UserDialog: React.FC<Props> = ({
	open,
	setOpen,
	editingUser,
	setEditingUser,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const dispatch = useDispatch<AppDispatch>();

	const [addUser, { isLoading: isAdding }] = useAddUserMutation();
	const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

	useEffect(() => {
		if (editingUser) reset(editingUser);
		else reset({ name: "", username: "", email: "" });
	}, [editingUser, reset]);

	const onSubmit = async (data: FormData) => {
		try {
			if (editingUser) {
				await updateUser({ id: editingUser.id, ...data }).unwrap();
				dispatch(
					showSnackbar({
						message: "User updated successfully!",
						severity: "success",
					})
				);
			} else {
				await addUser(data).unwrap();
				dispatch(
					showSnackbar({
						message: "User added successfully!",
						severity: "success",
					})
				);
			}
			setOpen(false);
			setEditingUser(null);
		} catch (err) {
			dispatch(
				showSnackbar({ message: "Failed to save user", severity: "error" })
			);
			console.log(err);
		}
	};

	const isSubmitting = isAdding || isUpdating;

	return (
		<Dialog open={open} onClose={() => !isSubmitting && setOpen(false)}>
			<DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogContent
					sx={{ display: "flex", flexDirection: "column", gap: 2 }}
				>
					<TextField
						label="Name"
						{...register("name")}
						disabled={isSubmitting}
						error={!!errors.name} // Highlight field if error
						helperText={errors.name?.message} // Show error message
					/>
					<TextField
						label="Username"
						{...register("username")}
						disabled={isSubmitting}
						error={!!errors.username}
						helperText={errors.username?.message}
					/>
					<TextField
						label="Email"
						{...register("email")}
						disabled={isSubmitting}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} disabled={isSubmitting}>
						Cancel
					</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={isSubmitting}
						startIcon={
							isSubmitting ? (
								<CircularProgress size={20} color="inherit" />
							) : null
						}
					>
						{editingUser ? "Save" : "Add"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default UserDialog;
