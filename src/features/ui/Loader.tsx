import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface LoaderProps {
	text?: string;
	fullscreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
	text = "Loading...",
	fullscreen = false,
}) => {
	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: fullscreen ? "100vh" : "100%",
				py: fullscreen ? 0 : 8,
				gap: 2,
			}}
		>
			<CircularProgress size={60} thickness={4} />
			<Typography variant="h6" color="text.secondary" fontWeight={500}>
				{text}
			</Typography>
		</Box>
	);
};

export default Loader;
