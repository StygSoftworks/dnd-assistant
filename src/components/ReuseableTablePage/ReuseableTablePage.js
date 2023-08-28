import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableContainer, TableHead, TableRow, Paper, Link as MuiLink } from '@mui/material';
import { Container, Title, AddLink } from '../styles';
import { useSearch, useSort } from '../../hooks';
import { HeaderCell, SearchBar } from '..';
import { cellHeaders, globalContent } from '../../content';
import TableRows from './TableRows';

// TODO!!!!! There is not a races details page
/**
 * 
 * @param {object} param0 
 * @param {string} param0.page The name of the page
 * @returns 
 */
const ReuseableTablePage = ({page}) => {

	const headers = cellHeaders[page];
	const content = globalContent[page];

	const [item, setItem] = useState([]);
	const { searchTerm, filteredData, handleSearch } = useSearch(item);
	const { sorting, handleSort, sortedData } = useSort(filteredData);

	useEffect(() => {
		fetch(`http://localhost:3001/api/${page}`) // Adjust the API endpoint accordingly
			.then(response => response.json())
			.then(data => {
				setItem(data);
			})
			.catch(error => {
				console.error(`Error fetching ${content.label.plural} data: ${error}`);
			});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return (
		<Container>
			<Title variant="h4">{`${content.label.plural} List`}</Title>
			<SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
			<AddLink>
				<MuiLink component={Link} to={`/add-${content.id}`}>{`Add New ${content.label.singular}`}</MuiLink>
			</AddLink>
			<TableContainer component={Paper}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							{headers.map((headerCell) => (
								<HeaderCell
									key={headerCell.column}
									label={headerCell.label}
									column={headerCell.column}
									sorting={sorting}
									handleSort={handleSort}
								/>
							))}
						</TableRow>
					</TableHead>
					<TableRows sortedData={sortedData} headers={headers} id={content.id}/>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default ReuseableTablePage;