import React, { useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
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
	const { register, handleSubmit, reset } = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const dispatch = useDispatch<AppDispatch>();

	const [addUser] = useAddUserMutation();
	const [updateUser] = useUpdateUserMutation();

	useEffect(() => {
		if (editingUser) reset(editingUser);
		else reset({ name: "", username: "", email: "" });
	}, [editingUser, reset]);

	const onSubmit = async (data: FormData) => {
		try {
			// throw new Error("Simulated network failure");
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
		} catch (err) {
			dispatch(
				showSnackbar({ message: "Failed to save user", severity: "error" })
			);
			console.log(err);
		} finally {
			setOpen(false);
			setEditingUser(null);
		}
	};

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogContent
					sx={{ display: "flex", flexDirection: "column", gap: 2 }}
				>
					<TextField label="Name" {...register("name")} />
					<TextField label="Username" {...register("username")} />
					<TextField label="Email" {...register("email")} />
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button type="submit" variant="contained">
						{editingUser ? "Save" : "Add"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default UserDialog;
