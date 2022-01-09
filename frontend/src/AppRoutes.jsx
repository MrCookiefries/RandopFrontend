import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Layout from "./components/pages/Layout";
import ProductList from "./components/products/ProductList";

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<Layout />}>
			<Route index element={<Home />} />
			<Route path="products" element={<ProductList />}>
				<Route path=":id" element={<p>product info</p>} />
			</Route>
			<Route path="cart" element={<p>cart</p>} />
			<Route path="login" element={<p>login</p>} />
			<Route path="register" element={<p>register</p>} />
		</Route>
		<Route path="*" element={<p>not found</p>} />
	</Routes>
);

export default AppRoutes;
