import React, { useState } from "react";
import {
	Table,
	TableContainer,
	Paper,
	Typography,
	Divider,
	TablePagination,
	Box,
} from "@mui/material";

import { useGetUsersQuery, useDeleteUserMutation } from "../../usersApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../app/store";
import { showSnackbar } from "../../../ui/uiSlice";
import { ConfirmDialog } from "../../../ui";
import { Loader } from "../../../ui";
import type { User } from "../../types";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";

interface Props {
	onEdit: (user: User) => void;
}

const UserTable: React.FC<Props> = ({ onEdit }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { data: users, isLoading, isError } = useGetUsersQuery();
	const [deleteUser] = useDeleteUserMutation();

	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleDeleteClick = (user: User) => {
		setSelectedUser(user);
		setConfirmOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (!selectedUser) return;
		try {
			await deleteUser(selectedUser.id).unwrap();
			dispatch(
				showSnackbar({
					message: "User deleted successfully!",
					severity: "success",
				})
			);
		} catch {
			dispatch(
				showSnackbar({ message: "Failed to delete user", severity: "error" })
			);
		} finally {
			setConfirmOpen(false);
			setSelectedUser(null);
		}
	};

	const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
	const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};

	if (isLoading) return <Loader text="Fetching users..." fullscreen />;
	if (isError)
		return (
			<Typography color="error" align="center" sx={{ mt: 4 }}>
				Failed to load users.
			</Typography>
		);

	const paginatedUsers = users?.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	);

	return (
		<Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					p: 2,
				}}
			>
				<Typography variant="h6" fontWeight={600}>
					Users
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Total: {users?.length}
				</Typography>
			</Box>

			<Divider />

			<TableContainer>
				<Table>
					<UserTableHeader />
					<tbody>
						{paginatedUsers?.map((user) => (
							<UserTableRow
								key={user.id}
								user={user}
								onEdit={onEdit}
								onDelete={handleDeleteClick}
							/>
						))}
					</tbody>
				</Table>
			</TableContainer>

			<TablePagination
				component="div"
				count={users?.length || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>

			<ConfirmDialog
				open={confirmOpen}
				title="Delete User"
				message={`Are you sure you want to delete "${selectedUser?.name}"?`}
				confirmText="Delete"
				cancelText="Cancel"
				onConfirm={handleConfirmDelete}
				onCancel={() => setConfirmOpen(false)}
			/>
		</Paper>
	);
};

export default UserTable;
