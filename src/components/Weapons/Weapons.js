import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Title, AddLink, SearchBar } from '../styles';
import { useSearch, useSort } from '../../hooks';
import { HeaderCell } from '..';

const Weapons = () => {
  const [weapons, setWeapons] = useState([]);
  const { searchTerm, filteredData, handleSearch } = useSearch(weapons);
  const { sorting, handleSort, sortedData } = useSort(filteredData);

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
          )
        }}
      />
      <AddLink>
        <MuiLink component={Link} to="/add-weapon">Add New Weapon</MuiLink>
      </AddLink>
      <TableContainer component={Paper} style={{maxHeight: '500px'}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
							<HeaderCell label={'Name'} column={'name'} sorting={sorting} handleSort={handleSort} />
							<HeaderCell label={'Proficiency'} column={'proficiency'} sorting={sorting} handleSort={handleSort} />
							<HeaderCell label={'Type'} column={'type'} sorting={sorting} handleSort={handleSort} />
							<HeaderCell label={'Dmg'} column={'damageMedium'} sorting={sorting} handleSort={handleSort} />
							<HeaderCell label={'Dmg Type'} column={'damageType'} sorting={sorting} handleSort={handleSort} />
							<HeaderCell label={'Critical'} column={'critical'} sorting={sorting} handleSort={handleSort} />
							<HeaderCell label={'Range'} column={'range'} sorting={sorting} handleSort={handleSort} />
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
