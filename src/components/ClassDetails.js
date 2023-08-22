import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Grid, Box } from '@mui/material';

const ClassDetails = () => {
  const { name } = useParams();
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/details-class/${encodeURIComponent(name)}`)
      .then(response => response.json())
      .then(data => {
        setClassDetails(data);
      })
      .catch(error => {
        console.error('Error fetching class details:', error);
      });
  }, [name]);

  if (!classDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        Class Details: {classDetails.name}
      </Typography>
      <Paper elevation={3} style={{ padding: '1rem' }}>
        <Typography variant="subtitle1">
          Alignment: {classDetails.alignment}
        </Typography>
        <Typography variant="subtitle1">
          Hit Die: {classDetails.hitDie}
        </Typography>
        <Typography variant="subtitle1">
          Spell Casting: {classDetails.spellCasting}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Class Skills
        </Typography>
        {Object.entries(classDetails.classSkills).map(([skill, ability]) => (
          <Typography variant="subtitle1" key={skill}>
            {skill}: {ability}
          </Typography>
        ))}

        <Typography variant="h6" gutterBottom>
          Base Attack Bonus: {classDetails.baseAttackBonus}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Saves
        </Typography>
        {Object.entries(classDetails.saves).map(([saveType, saveLevel]) => (
          <Typography variant="subtitle1" key={saveType}>
            {saveType}: {saveLevel}
          </Typography>
        ))}

        <Typography variant="h6" gutterBottom>
          Skill Points
        </Typography>
        <Typography variant="subtitle1">
          1st Level: {classDetails.skillPoints['1stLevel']}
        </Typography>
        <Typography variant="subtitle1">
          Additional Levels: {classDetails.skillPoints['additionalLevels']}
        </Typography>
        <Typography variant="subtitle1">
          Per Level: {classDetails.skillPoints['perLevel']}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Class Features
        </Typography>
        {classDetails.classFeatures.map(feature => (
          <Box key={feature.name} mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              {feature.name} (Level {feature.level})
            </Typography>
            <Typography variant="body2">
              {feature.description}
            </Typography>
          </Box>
        ))}
      </Paper>
    </div>
  );
};

export default ClassDetails;
