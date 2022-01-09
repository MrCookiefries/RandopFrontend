import { Routes, Route } from "react-router-dom";

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<p>layout</p>}>
			<Route index element={<p>home</p>} />
			<Route path="products" element={<p>products list</p>}>
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
