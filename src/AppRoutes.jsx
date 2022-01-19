import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import ProductDetails from "./components/products/ProductDetails";
import ProductList from "./components/products/ProductList";

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<Layout />}>
			<Route index element={<Home />} />
			<Route path="products" element={<ProductList />}>
				<Route path=":id" element={<ProductDetails />} />
			</Route>
			<Route path="cart" element={<p>cart</p>} />
			<Route path="login" element={<LoginForm />} />
			<Route path="register" element={<RegisterForm />} />
		</Route>
		<Route path="*" element={<p>not found</p>} />
	</Routes>
);

export default AppRoutes;
