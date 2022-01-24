import { Typography, Box } from "@mui/material";
import formatName from "../../helpers/formatName";

const ProductShow = ({ name, image }) => {
	return (
		<Box
			p={2}
			sx={{ display: "grid", height: "100%", gridTemplateRows: "auto 1fr" }}
		>
			<Typography mb={2} align="left" variant="body1">
				{formatName(name)}
			</Typography>
			<img
				style={{
					width: "300px",
					height: "auto",
					alignSelf: "center",
				}}
				src={image}
				alt={name}
			/>
		</Box>
	);
};

export default ProductShow;
