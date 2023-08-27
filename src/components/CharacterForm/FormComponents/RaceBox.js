import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const RaceBox = ({ onRaceSelect }) => {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedRaceData, setSelectedRaceData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/races') // Adjust the API endpoint accordingly
      .then(response => response.json())
      .then(data => {
        setRaces(data);
      })
      .catch(error => {
        console.error('Error fetching Races data:', error);
      });
  }, []);

  const handleRaceSelect = (event) => {
    const selectedRaceName = event.target.value;
    const raceData = races.find(race => race.name === selectedRaceName);
    setSelectedRace(selectedRaceName);
    setSelectedRaceData(raceData);    
    onRaceSelect(raceData) ;// Pass the selected race data to the parent component
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Select a Race:
      </Typography>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Select a Race</InputLabel>
        <Select
          value={selectedRace}
          onChange={handleRaceSelect}
          label="Select a Race"
				>
          {races.map(race => (
            <MenuItem key={race.name} value={race.name}>
              {race.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedRaceData && (
        <Card variant="outlined" sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h6">{selectedRaceData.name}</Typography>
            <Typography variant="body1" color="textSecondary">
              {selectedRaceData.personality}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Attributes:
            </Typography>
            <ul>
              {Object.entries(selectedRaceData.ability_bonuses)
                .filter(([attribute, value]) => value !== 0)
                .map(([attribute, value]) => (
                  <li key={attribute}>
                    {attribute}: {value >= 0 ? `+${value}` : value}
                  </li>
                ))}
              {Object.entries(selectedRaceData.ability_bonuses).every(([_, value]) => value === 0) && (
                <li>None</li>
              )}
            </ul>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Size: {selectedRaceData.size}
            </Typography>
            <Typography variant="body1">
              Speed: {selectedRaceData.speed}
            </Typography>
            {/* Display other race information here */}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default RaceBox;
