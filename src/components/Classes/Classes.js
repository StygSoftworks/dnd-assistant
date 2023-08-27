import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink, Typography, Box, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Title, AddLink, SearchBar, TableHeader } from '../styles';
import { useSearch } from '../../hooks/useSearch';
import { useSort } from '../../hooks/useSort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { searchTerm, filteredData, handleSearch } = useSearch(classes);
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

              {renderHeaderCell('Name', 'name')}
              {renderHeaderCell('HD', 'hitDie')}
              {renderHeaderCell('BAB', 'baseAttackBonus')}
              {renderHeaderCell('Spells?', 'spellCasting')}
              {renderHeaderCell('Fort', 'Fortitude')}
              {renderHeaderCell('Ref', 'Reflex')}
              {renderHeaderCell('Will', 'Will')}
              {renderHeaderCell('SP', 'skillPoints.additionalLevels')}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((playerclass, index) => (
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