import React, { useState, useMemo } from "react";
import {
	Table,
	TableContainer,
	Paper,
	Typography,
	Divider,
	TablePagination,
	Box,
	TextField,
} from "@mui/material";
import { useGetUsersQuery, useDeleteUserMutation } from "../../usersApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../app/store";
import { showSnackbar } from "../../../ui/uiSlice";
import { ConfirmDialog } from "../../../ui";
// import { Loader } from "../../../ui";
import type { User } from "../../types";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import UserTableSkeleton from "./UserTableSkeleton";

interface Props {
	onEdit: (user: User) => void;
}

const UserTable: React.FC<Props> = ({ onEdit }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { data: users, isLoading, isError, isFetching } = useGetUsersQuery();
	const [deleteUser] = useDeleteUserMutation();

	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [search, setSearch] = useState("");

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

	// 🔍 Filter users by search term
	const filteredUsers = useMemo(() => {
		if (!users) return [];
		return users.filter((u) =>
			u.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [users, search]);

	// 🧾 Paginate filtered users
	const paginatedUsers = useMemo(() => {
		return filteredUsers.slice(
			page * rowsPerPage,
			page * rowsPerPage + rowsPerPage
		);
	}, [filteredUsers, page, rowsPerPage]);

	if (isLoading || isFetching) return <UserTableSkeleton />;
	if (isError)
		return (
			<Typography color="error" align="center">
				Failed to fetch users.
			</Typography>
		);

	return (
		<Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
			{/* 🧠 Header */}
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					justifyContent: "space-between",
					alignItems: { xs: "flex-start", sm: "center" },
					gap: 2,
					p: 2,
				}}
			>
				<Box>
					<Typography variant="h6" fontWeight={600}>
						Users
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Total: {filteredUsers.length}
					</Typography>
				</Box>

				{/* 🔍 Search Field */}
				<TextField
					label="Search by name"
					variant="outlined"
					size="small"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setPage(0); // reset pagination when searching
					}}
					sx={{ width: { xs: "100%", sm: 250 } }}
				/>
			</Box>

			<Divider />

			{/* 🧾 Table */}
			<TableContainer>
				<Table>
					<UserTableHeader />
					<tbody>
						{paginatedUsers.length > 0 ? (
							paginatedUsers.map((user) => (
								<UserTableRow
									key={user.id}
									user={user}
									onEdit={onEdit}
									onDelete={handleDeleteClick}
								/>
							))
						) : (
							<tr>
								<td
									colSpan={4}
									style={{ textAlign: "center", padding: "20px" }}
								>
									<Typography color="text.secondary">
										{search
											? "No matching users found."
											: "No users available."}
									</Typography>
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</TableContainer>

			{/* 📄 Pagination */}
			<TablePagination
				component="div"
				count={filteredUsers.length}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>

			{/* ⚠️ Delete Confirmation */}
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
