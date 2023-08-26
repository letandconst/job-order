import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import DataContext from './context/DataContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<DataContext>
				<App />
			</DataContext>
		</ChakraProvider>
	</React.StrictMode>
);
