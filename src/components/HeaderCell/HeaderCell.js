import React from 'react';
import { TableHeader} from '../styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const HeaderCell = ({ label, column, sorting, handleSort }) => {
	return (
		<TableHeader onClick={() => handleSort(column)}>
			<div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
				{label}
				{sorting.column === column && sorting.direction === 'asc' && <ArrowUpwardIcon />}
				{sorting.column === column && sorting.direction === 'desc' && <ArrowDownwardIcon />}
			</div>
		</TableHeader>
	);
};

export default HeaderCell;
