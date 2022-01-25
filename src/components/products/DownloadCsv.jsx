import Papa from "papaparse";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import Api from "../../helpers/api";

const DownloadCsv = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		(async () => {
			const { products } = await Api.getProducts(null);
			setProducts(products);
		})();
	}, []);

	const csv = useMemo(() => {
		return Papa.unparse(products);
	}, [products]);

	// https://stackoverflow.com/questions/17564103/using-javascript-to-download-file-as-a-csv-file/17564369
	// download file link adapted from ^ January 20th, 2022
	return (
		<>
			{products.length ? (
				<a
					style={{ textDecoration: "none" }}
					href={`data:text/csv;charset=utf-8,${csv}`}
					download="products.csv"
				>
					<LoadingButton variant="contained">Download</LoadingButton>
				</a>
			) : (
				<LoadingButton loading variant="contained" />
			)}
		</>
	);
};

export default DownloadCsv;
