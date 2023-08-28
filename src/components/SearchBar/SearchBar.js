import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({searchTerm, handleSearch}) => (
	<TextField
		style={{
			width: '250px', // Adjust the width as needed
			marginRight: '1rem'
		}}
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
);

export default SearchBar;
