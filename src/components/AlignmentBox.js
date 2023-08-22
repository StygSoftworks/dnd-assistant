import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AlignmentBox = ({ onAlignmentSelect }) => {
  const [alignments, setAlignments] = useState([]);
  const [selectedAlignment, setSelectedAlignment] = useState('');
  const [selectedAlignmentData, setSelectedAlignmentData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/alignments') // Adjust the API endpoint accordingly
      .then(response => response.json())
      .then(data => {
        setAlignments(data);
      })
      .catch(error => {
        console.error('Error fetching Alignments data:', error);
      });
  }, []);

  const handleAlignmentSelect = (event) => {
    const selectedAlignmentName = event.target.value;
    const alignmentData = alignments.find(alignment => alignment.name === selectedAlignmentName);
    setSelectedAlignment(selectedAlignmentName);
    setSelectedAlignmentData(alignmentData);

    // Pass the selected alignment data to the parent component
    onAlignmentSelect(alignmentData);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Select an Alignment:
      </Typography>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Select an Alignment</InputLabel>
        <Select
          value={selectedAlignment}
          onChange={handleAlignmentSelect}
          label="Select an Alignment"
        >
          {alignments.map(alignment => (
            <MenuItem key={alignment.name} value={alignment.name}>
              {alignment.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedAlignmentData && (
        <Card variant="outlined" sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h6">{selectedAlignmentData.name}</Typography>
            <Typography variant="body1" color="textSecondary">
              {selectedAlignmentData.description}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Reason to Play:
            </Typography>
            <Typography variant="body2">
              {selectedAlignmentData.reasonToPlay}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Examples:
            </Typography>
            <ul>
              {selectedAlignmentData.examples.map(example => (
                <li key={example}>{example}</li>
              ))}
            </ul>
            {/* Display other alignment information here */}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AlignmentBox;
