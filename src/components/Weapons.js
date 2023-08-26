import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink, Typography, Box, InputAdornment, TextField } from '@mui/material';
import { styled } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import { Container,Title,AddLink,SearchBar,TableHeader } from './styles';
import { useSearch } from '../hooks/useSearch';
import { useSort } from '../hooks/useSort';


const Weapons = () => {
  const [weapons, setWeapons] = useState([]);

  const { searchTerm, filteredData, handleSearch } = useSearch(weapons);
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
    fetch('http://localhost:3001/api/weapons') // Adjust the API endpoint accordingly
      .then(response => response.json())
      .then(data => {
        setWeapons(data);
      })
      .catch(error => {
        console.error('Error fetching weapons data:', error);
      });
  }, []);




  return (
    <Container>
      <Title variant="h4">
        Weapons List
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
        <MuiLink component={Link} to="/add-weapon">Add New Weapon</MuiLink>
      </AddLink>

      <TableContainer component={Paper} style={{maxHeight: '500px'}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {renderHeaderCell('Name', 'name')}
              {renderHeaderCell('Proficiency', 'proficiency')}
              {renderHeaderCell('Type', 'type')}
              {renderHeaderCell('Dmg', 'damageMedium')}
              {renderHeaderCell('Dmg Type', 'damageType')}
              {renderHeaderCell('Critical', 'critical')}
              {renderHeaderCell('Range', 'range')}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((weapon, index) => (
              <TableRow key={weapon.name}>
                <TableCell>
                  <Link to={`/details-weapon/${encodeURIComponent(weapon.name)}`}>
                    {weapon.name}
                  </Link>
                </TableCell>
                <TableCell>{weapon.proficiency}</TableCell>
                <TableCell>{weapon.type}</TableCell>
                <TableCell>{weapon.damage}</TableCell>
                <TableCell>{weapon.damageType}</TableCell>
                <TableCell>{weapon.critical}</TableCell>
                <TableCell>{weapon.range}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Weapons;
