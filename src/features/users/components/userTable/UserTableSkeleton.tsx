import React from "react";
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Skeleton,
} from "@mui/material";

const UserTableSkeleton: React.FC = () => (
	<TableContainer component={Paper}>
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell>Username</TableCell>
					<TableCell>Email</TableCell>
					<TableCell align="center">Actions</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{[...Array(5)].map((_, i) => (
					<TableRow key={i}>
						<TableCell>
							<Skeleton width="80%" />
						</TableCell>
						<TableCell>
							<Skeleton width="60%" />
						</TableCell>
						<TableCell>
							<Skeleton width="90%" />
						</TableCell>
						<TableCell align="center">
							<Skeleton variant="circular" width={32} height={32} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</TableContainer>
);

export default UserTableSkeleton;
