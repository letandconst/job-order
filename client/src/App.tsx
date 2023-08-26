import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ComponentsLibrary from './pages/components-library';

// Auth Guard
import AuthRedirect from './utils/AuthRedirect';
import ProtectedRoute from './utils/ProtectedRoute';

// Forms
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';

// Layout
import Layout from './components/Layout/Layout';

// Pages
import Main from './pages/Main';
import Mechanics from './pages/Mechanics';
import Products from './pages/Products';
import JobOrders from './pages/JobOrders';
import ViewJobOrder from './pages/modules/ViewJobOrder';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/components-library'
					element={<ComponentsLibrary />}
				/>

				<Route element={<AuthRedirect />}>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
				</Route>

				<Route element={<ProtectedRoute />}>
					<Route
						path='/'
						element={
							<Layout>
								<Main />
							</Layout>
						}
					/>
					<Route
						path='/job-orders'
						element={
							<Layout>
								<JobOrders />
							</Layout>
						}
					/>
					<Route
						path='/job-orders/:id'
						element={
							<Layout>
								<ViewJobOrder />
							</Layout>
						}
					/>

					<Route
						path='/products'
						element={
							<Layout>
								<Products />
							</Layout>
						}
					/>
					<Route
						path='/mechanics'
						element={
							<Layout>
								<Mechanics />
							</Layout>
						}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
