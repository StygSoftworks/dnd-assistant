import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Title, AddLink, SearchBar } from '../styles';
import { useSearch } from '../../hooks/useSearch';
import { useSort } from '../../hooks/useSort';
import { initialSorting } from '../../content';
import { HeaderCell } from '..'; 

const Characters = () => {
  const [characters, setCharacters] = useState([]);

	const { searchTerm, filteredData, handleSearch } = useSearch(characters);
	const { sorting, handleSort, sortedData } = useSort(filteredData, initialSorting);

  useEffect(() => {
    fetch('http://localhost:3001/api/characters') // Adjust the API endpoint accordingly
      .then(response => response.json())
      .then(data => {
        setCharacters(data);
      })
      .catch(error => {
        console.error('Error fetching characters data:', error);
      });
  }, []);

  return (
    <Container>
      <Title variant="h4">
        Characters List
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
        <MuiLink component={Link} to="/add-character">Add New Character</MuiLink>
      </AddLink>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
							<HeaderCell label={'Name'} column={'name'} sorting={sorting} handleSort={handleSort}/>
							<HeaderCell label={'Alignment'} column={'alignment'} sorting={sorting} handleSort={handleSort}/>
							<HeaderCell label={'Race'} column={'alignracement'} sorting={sorting} handleSort={handleSort}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((playercharacter, index) => (
              <TableRow key={playercharacter.name}>
                <TableCell>
                  <Link to={`/details-character/${encodeURIComponent(playercharacter.name)}`}>
                    {playercharacter.name}
                  </Link>
                </TableCell>
                <TableCell>{playercharacter.alignment}</TableCell>
                <TableCell>{playercharacter.race}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Characters;
