import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";

const UserTableHeader: React.FC = () => {
	return (
		<TableHead sx={{ bgcolor: "grey.100" }}>
			<TableRow>
				<TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
				<TableCell sx={{ fontWeight: 600 }}>Username</TableCell>
				<TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
				<TableCell sx={{ fontWeight: 600 }} align="center">
					Actions
				</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default UserTableHeader;
