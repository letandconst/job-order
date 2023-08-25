import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ComponentsLibrary from './pages/components-library';
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route
						path='/components-library'
						element={<ComponentsLibrary />}
					/>
					<Route
						path='/'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
