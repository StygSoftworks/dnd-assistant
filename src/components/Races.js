import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink, Typography, Box, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Title, AddLink, SearchBar, TableHeader } from './styles';
import { useSearch } from '../hooks/useSearch';
import { useSort } from '../hooks/useSort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import racesData from '../backend/data/races.json';


const Races = () => {
    const [races, setRaces] = useState([]);
    const { searchTerm, filteredData, handleSearch } = useSearch(races);
    const initialSorting = {
        column: 'name',
        direction: 'asc',
    };
    const { sorting, handleSort, sortedData } = useSort(filteredData, initialSorting);

    const renderHeaderCell = (label, column) => {
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


    useEffect(() => {setRaces(racesData);}, []);


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
                    ),
                }}
            />

            <AddLink>
                <MuiLink component={Link} to="/add-race">Add New Race</MuiLink>
            </AddLink>

            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {renderHeaderCell('Name', 'name')}
                            {renderHeaderCell('Ability Bonuses', 'ability_bonuses')}
                            {renderHeaderCell('Size', 'size')}
                            {renderHeaderCell('Speed', 'speed')}
                            {renderHeaderCell('Languages', 'languages')}
                            {renderHeaderCell('Traits', 'traits')}
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
