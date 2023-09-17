import React, { createContext, useState, useContext, ReactNode } from 'react';

interface DataContextProps {
	children: ReactNode;
}

export interface ServiceType {
	name: string;
	description: string;
	amount: number;
}
interface TotalAmountContextValues {
	totalLabor: number;
	setTotalLabor: React.Dispatch<React.SetStateAction<number>>;
	totalProductPrice: number;
	setTotalProductPrice: React.Dispatch<React.SetStateAction<number>>;
	totalPrice: number;
	setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

const Context = createContext<TotalAmountContextValues | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useTotalAmountData() {
	const context = useContext(Context);
	if (!context) {
		throw new Error('useData must be used within a DataContextProvider');
	}
	return context;
}

const TotalAmountContext = ({ children }: DataContextProps) => {
	const [totalLabor, setTotalLabor] = useState<number>(0);
	const [totalProductPrice, setTotalProductPrice] = useState<number>(0);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	const contextValues: TotalAmountContextValues = {
		totalLabor,
		setTotalLabor,
		totalProductPrice,
		setTotalProductPrice,
		totalPrice,
		setTotalPrice,
	};

	return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export default TotalAmountContext;
