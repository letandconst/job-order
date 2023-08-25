import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ComponentsLibrary from './pages/components-library';

import Main from './pages/Main';

// Auth Guard
import AuthRedirect from './utils/AuthRedirect';
import ProtectedRoute from './utils/ProtectedRoute';

// Forms
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';

// Layout
import Layout from './components/Layout/Layout';

function App() {
	return (
		<>
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
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
