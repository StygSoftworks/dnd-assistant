import { useState } from 'react';

export const useSearch = (dataList) => {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredData = dataList.filter(data =>
		searchTerm === '' || Object.values(data).some(value =>
			value.toString().toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	return { searchTerm, filteredData, handleSearch: (event) => setSearchTerm(event.target.value) };
};
