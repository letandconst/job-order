import { Navigate, Outlet } from 'react-router-dom';

const AuthRedirect = () => {
	const isAuthenticated = localStorage.getItem('isAuthenticated');

	if (isAuthenticated) {
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}

	return <Outlet />;
};

export default AuthRedirect;
