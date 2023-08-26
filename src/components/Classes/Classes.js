import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Title, AddLink, SearchBar } from '../styles';
import { useSearch } from '../../hooks/useSearch';
import { useSort } from '../../hooks/useSort';
import HeaderCell from '../HeaderCell/HeaderCell';
import { initialSorting } from '../../content';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { searchTerm, filteredData, handleSearch } = useSearch(classes);
  const { sorting, handleSort, sortedData } = useSort(filteredData, initialSorting);

  useEffect(() => {
    fetch('http://localhost:3001/api/classes') // Adjust the API endpoint accordingly
      .then(response => response.json())
      .then(data => {
        setClasses(data);
      })
      .catch(error => {
        console.error('Error fetching classes data:', error);
      });
  }, []);

  return (
    <Container>
      <Title variant="h4">
        Classes List
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
        <MuiLink component={Link} to="/add-class">Add New Class</MuiLink>
      </AddLink>

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
							<HeaderCell label={'Name'} column={'name'} sorting={sorting} handleSort={handleSort}/>
							<HeaderCell label={'HD'} column={'hitDie'} sorting={sorting} handleSort={handleSort}/>
							<HeaderCell label={'BAB'} column={'baseAttackBonus'} sorting={sorting} handleSort={handleSort}/>
							<HeaderCell label={'Spells?'} column={'spellCasting'} sorting={sorting} handleSort={handleSort}/>
							<HeaderCell label={'Fort'} column={'Fortitude'} sorting={sorting} handleSort={handleSort}/>
							<HeaderCell label={'Ref'} column={'Reflex'} sorting={sorting} handleSort={handleSort}/>
							<HeaderCell label={'Will'} column={'Will'} sorting={sorting} handleSort={handleSort}/>
							<HeaderCell label={'SP'} column={'skillPoints.additionalLevels'} sorting={sorting} handleSort={handleSort}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((playerclass) => (
              <TableRow key={playerclass.name}>
                <TableCell>
                  <Link to={`/details-class/${encodeURIComponent(playerclass.name)}`}>
                    {playerclass.name}
                  </Link>
                </TableCell>
                <TableCell>{playerclass.hitDie}</TableCell>
                <TableCell>{playerclass.baseAttackBonus}</TableCell>
                <TableCell>{playerclass.spellCasting}</TableCell>
                <TableCell>{playerclass.saves.Fortitude}</TableCell>
                <TableCell>{playerclass.saves.Reflex}</TableCell>
                <TableCell>{playerclass.saves.Will}</TableCell>
                <TableCell>{playerclass.skillPoints.additionalLevels}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Classes;
