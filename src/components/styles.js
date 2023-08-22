import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink, Typography, Box, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';

export const Container = styled('div')({
    padding: '1rem',
});

export const Title = styled(Typography)({
    marginBottom: '1rem',
});

export const TableHeader = styled(TableCell)({
    fontWeight: 'bolder'
});

export const AddLink = styled(Box)({
    display: 'block',
    textAlign: 'right',
    marginTop: '1rem',
    marginBottom: '1rem',
});

export const SearchBar = styled(TextField)({
    width: '250px', // Adjust the width as needed
    marginRight: '1rem',
});


