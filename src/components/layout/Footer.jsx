import { Paper } from "@mui/material";
import { Link, Button, Typography, Box } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import DownloadCsv from "../products/DownloadCsv";

const Footer = () => {
	return (
		<footer>
			<Paper elevation={0} sx={{ borderRadius: 0 }}>
				<Box
					p={2}
					sx={{
						display: "flex",
						flexWrap: "wrap",
						gap: 2,
						justifyContent: "space-evenly",
					}}
				>
					<Typography variant="body2">
						Export Products to CSV <DownloadCsv />
					</Typography>
					<Link
						target="_blank"
						href="https://github.com/MrCookiefries"
						underline="none"
						rel="noreferrer"
					>
						<Button variant="outlined" endIcon={<GitHub />}>
							GitHub
						</Button>
					</Link>
				</Box>
			</Paper>
		</footer>
	);
};

export default Footer;
