import React, { useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import { UserTable, UserDialog } from "../features/users";
import { AppSnackbar } from "../features/ui";
import type { User } from "../features/users";

const App: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);

	const handleEdit = (user: User) => {
		setEditingUser(user);
		setOpen(true);
	};

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				User Manager
			</Typography>
			<Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
				Add User
			</Button>
			<UserTable onEdit={handleEdit} />
			<UserDialog
				open={open}
				setOpen={setOpen}
				editingUser={editingUser}
				setEditingUser={setEditingUser}
			/>
			<AppSnackbar />
		</Container>
	);
};

export default App;
