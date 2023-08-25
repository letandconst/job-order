import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ComponentsLibrary from './pages';
function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route
						path='/components-library'
						element={<ComponentsLibrary />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
