import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link as MuiLink,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Title, AddLink, SearchBar } from '../styles';
import { useSearch, useSort } from '../../hooks';
import { HeaderCell } from '..';

const Templates = () => {
  const [templates, setTemplates] = useState([]); // Updated variable name
  const { searchTerm, filteredData, handleSearch } = useSearch(templates); // Updated variable name
  const { sorting, handleSort, sortedData } = useSort(filteredData);

  useEffect(() => {
    fetch('http://localhost:3001/api/templates') // Updated API endpoint
      .then(response => response.json())
      .then(data => {
        setTemplates(data); // Updated variable name
      })
      .catch(error => {
        console.error('Error fetching templates data:', error);
      });
  }, []);

  return (
    <Container>
      <Title variant="h4">Templates List</Title>
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
        <MuiLink component={Link} to="/add-template">
          Add New Template
        </MuiLink>
      </AddLink>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
							<HeaderCell label={'Name'} column={'name'} sorting={sorting} handleSort={handleSort} />
							<HeaderCell label={'Description'} column={'description'} sorting={sorting} handleSort={handleSort} />
							<HeaderCell label={'Level Adjustment'} column={'level_adjustment'} sorting={sorting} handleSort={handleSort} />
							<HeaderCell label={'Natural Armor'} column={'natural_armor'} sorting={sorting} handleSort={handleSort} />
              {/* Add more header cells as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((template, index) => (
              <TableRow key={template.name}>
                <TableCell>
                  <Link to={`/details-template/${encodeURIComponent(template.name)}`}>
                    {template.name}
                  </Link>
                </TableCell>
                <TableCell>{template.description}</TableCell>
                <TableCell>{template.level_adjustment}</TableCell>
                <TableCell>{template.natural_armor}</TableCell>
                {/* Add more table cells for other attributes */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Templates; // Updated component name
