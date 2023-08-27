import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Title, AddLink, SearchBar } from '../styles';
import { useSearch, useSort } from '../../hooks';
import { HeaderCell } from '..';

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
				<Title variant="h4">
					Races List
				</Title>
				<SearchBar
					label="Search"
					variant="outlined"
					size="small"
					value={searchTerm}
					onChange={handleSearch}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						)
					}}
				/>
				<AddLink>
					<MuiLink component={Link} to="/add-race">Add New Race</MuiLink>
				</AddLink>
				<TableContainer component={Paper}>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								<HeaderCell label={'Name'} column={'name'} sorting={sorting} handleSort={handleSort} />
								<HeaderCell label={'Ability Bonuses'} column={'ability_bonuses'} sorting={sorting} handleSort={handleSort} />
								<HeaderCell label={'Size'} column={'size'} sorting={sorting} handleSort={handleSort} />
								<HeaderCell label={'Speed'} column={'speed'} sorting={sorting} handleSort={handleSort} />
								<HeaderCell label={'Languages'} column={'traits.languages.automatic'} sorting={sorting} handleSort={handleSort} />
								<HeaderCell label={'Traits'} column={'traits.abilities'} sorting={sorting} handleSort={handleSort} />
							</TableRow>
						</TableHead>
						<TableBody>
							{sortedData.map((race, index) => (
								<TableRow key={race.name}>
									<TableCell>
										<Link to={`/details-race/${encodeURIComponent(race.name)}`}>
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
