import { useState } from 'react';

export const useSort = (dataList, initialSorting) => {
	const [sorting, setSorting] = useState(initialSorting);

	const handleSort = (column) => {
		setSorting((prevSorting) => ({
			column,
			direction: prevSorting.direction === 'asc' ? 'desc' : 'asc',
		}));
	};

	const sortedData = [...dataList].sort((a, b) => {
		const aValue = getColumnValue(a, sorting.column);
		const bValue = getColumnValue(b, sorting.column);

		if (typeof aValue === 'undefined' || typeof bValue === 'undefined') {
			if (typeof aValue !== 'undefined') return -1; // a is defined, but b is not
			if (typeof bValue !== 'undefined') return 1; // b is defined, but a is not
			return 0; // both are undefined
		}

		const comparison = compareValues(aValue, bValue);
		return sorting.direction === 'asc' ? comparison : -comparison;
	});

	return { sorting, handleSort, sortedData };
};

const getColumnValue = (data, column) => {
	return column.split('.').reduce((obj, key) => (obj && obj[key]) || undefined, data);
};

const compareValues = (a, b) => {
	if (typeof a === 'string' && typeof b === 'string') {
		return a.localeCompare(b);
	} else if (typeof a === 'number' && typeof b === 'number') {
		return a - b;
	} else {
		return 0; // Handle other data types as needed
	}
};
