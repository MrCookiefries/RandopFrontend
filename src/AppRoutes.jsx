import { Routes, Route } from "react-router-dom";
import CartList from "./components/carts/CartList";
import CartDetails from "./components/carts/CartDetails";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import ProductDetails from "./components/products/ProductDetails";
import ProductList from "./components/products/ProductList";
import PrivateRoute from "./PrivateRoute";
import Checkout from "./components/checkout/Checkout";
import PaymentSuccess from "./components/checkout/PaymentSuccess";
import AdminRoute from "./AdminRoute";
import AdminPanel from "./components/admin/AdminPanel";
import AdminProductList from "./components/admin/ProductList";
import { Outlet } from "react-router";
import AddProductForm from "./components/forms/AddProductForm";

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<Layout />}>
			<Route index element={<Home />} />
			<Route path="products" element={<ProductList />}>
				<Route path=":id" element={<ProductDetails />} />
			</Route>
			<Route
				path="carts"
				element={
					<PrivateRoute>
						<CartList />
					</PrivateRoute>
				}
			>
				<Route path=":id" element={<CartDetails />} />
			</Route>
			<Route
				path="checkout"
				element={
					<PrivateRoute>
						<Checkout />
					</PrivateRoute>
				}
			/>
			<Route path="login" element={<LoginForm />} />
			<Route path="register" element={<RegisterForm />} />
			<Route path="payment-success/:cartId" element={<PaymentSuccess />} />
			<Route
				path="admin"
				element={
					<AdminRoute>
						<AdminPanel />
					</AdminRoute>
				}
			>
				<Route path="products" element={<Outlet />}>
					<Route index element={<AdminProductList />} />
					<Route path="create" element={<AddProductForm />} />
				</Route>
			</Route>
		</Route>
		<Route path="*" element={<p>not found</p>} />
	</Routes>
);

export default AppRoutes;
