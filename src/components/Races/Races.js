import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink } from '@mui/material';
import { Container, Title, AddLink } from '../styles';
import { useSearch, useSort } from '../../hooks';
import { HeaderCell, SearchBar } from '..';
import { cellHeaders, globalContent } from '../../content';

const {races: racesHeaders} = cellHeaders;
const {races: racesContent} = globalContent;

// TODO!!!!! There is not a races details page
const Races = () => {
	const [races, setRaces] = useState([]);
	const { searchTerm, filteredData, handleSearch } = useSearch(races);
	const { sorting, handleSort, sortedData } = useSort(filteredData);

    useEffect(() => {
			fetch('http://localhost:3001/api/races') // Adjust the API endpoint accordingly
				.then(response => response.json())
				.then(data => {
					setRaces(data);
				})
				.catch(error => {
					console.error('Error fetching Races data:', error);
				});
		}, []);

    return (
			<Container>
				<Title variant="h4">{racesContent.title}</Title>
				<SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
				<AddLink>
					<MuiLink component={Link} to={racesContent.addButton.route}>{racesContent.addButton.label}</MuiLink>
				</AddLink>
				<TableContainer component={Paper}>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								{racesHeaders.map((headerCell) => (
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
						<TableBody>
							{sortedData.map((race) => (
								<TableRow key={race.name}>
									<TableCell>
										<Link to={`${racesContent.name}${encodeURIComponent(race.name)}`}>
										{race.name}
										</Link>
									</TableCell>
									{/** I want to fix this it no look good */}
									<TableCell>{JSON.stringify(race.ability_bonuses)}</TableCell>
									<TableCell>{race.size}</TableCell>
									<TableCell>{race.speed}</TableCell>
									<TableCell>{race.traits.languages.automatic}</TableCell>
									<TableCell>{race.traits.abilities.map(ability => ability.name).join(', ')}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
		</Container>
	);
};

export default Races;
