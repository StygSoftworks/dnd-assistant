import React from 'react';
import { TableHeader } from '../styles';
import { useSort } from '../../hooks/useSort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { initialSorting } from "../../content";

const HeaderCell = ({label, column, sorting, handleSort}) => {

	return (
		<TableHeader onClick={() => handleSort(column)}>
			<div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
				{label}
				{sorting.column === column && sorting.direction === 'asc' && <ArrowUpwardIcon />}
				{sorting.column === column && sorting.direction === 'desc' && <ArrowDownwardIcon />}
			</div>
		</TableHeader>
	);
}

export default HeaderCell;
