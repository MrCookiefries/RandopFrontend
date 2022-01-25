import { Typography, Box } from "@mui/material";
import formatName from "../../helpers/formatName";

const ProductShow = ({ name, image, isSmall }) => {
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
					width: "min(300px, 80%)",
					height: "auto",
					alignSelf: "center",
					margin: `0 ${isSmall ? "auto" : 0}`,
				}}
				src={image}
				alt={name}
			/>
		</Box>
	);
};

export default ProductShow;
