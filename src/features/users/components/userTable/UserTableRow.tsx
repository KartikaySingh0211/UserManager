import { type FC } from "react";
import { TableRow, TableCell, IconButton, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { type User } from "../../types";

interface Props {
	user: User;
	onEdit: (user: User) => void;
	onDelete: (user: User) => void;
}

const UserTableRow: FC<Props> = ({ user, onEdit, onDelete }) => {
	return (
		<TableRow
			hover
			sx={{
				"&:last-child td, &:last-child th": { border: 0 },
				"&:hover": { backgroundColor: "grey.50" },
			}}
		>
			<TableCell>{user.name}</TableCell>
			<TableCell>{user.username}</TableCell>
			<TableCell>{user.email}</TableCell>
			<TableCell align="center">
				<Tooltip title="Edit">
					<IconButton color="primary" onClick={() => onEdit(user)}>
						<Edit />
					</IconButton>
				</Tooltip>
				<Tooltip title="Delete">
					<IconButton color="error" onClick={() => onDelete(user)}>
						<Delete />
					</IconButton>
				</Tooltip>
			</TableCell>
		</TableRow>
	);
};

export default UserTableRow;
