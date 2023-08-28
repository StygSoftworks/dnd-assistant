import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import charactersData from "../backend/data/characters.json";
import {
  Container,
  
} from "./styles"; // Added CenteredTableCell

import { Grid, Paper, Typography } from "@mui/material";

import HealthWidget from "../widgets/HealthWidget";
import InitiativeRollWidget from "../widgets/InitiativeRollWidget";
import AttributesTableWidget from "../widgets/AttributeTableWidget";
import BaseAttackBonusWidget from "../widgets/BaseAttackBonusWidget";
import {calculateModifier} from "../computation/dndMath";
import ArmorClassWidget from "../widgets/ArmorClassWidget"; // Import the ArmorClassWidget component

const CharacterDetails = () => {
  const { name } = useParams();
  const [characterDetails, setCharacterDetails] = useState(null);
  const [totalValues, setTotalValues] = useState({}); // Define the state and its setter here

  const handleAddBuff = (attribute, value) => {
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue)) {
      setCharacterDetails((prevDetails) => ({
        ...prevDetails,
        buffs: {
          ...prevDetails.buffs,
          [attribute]: (prevDetails.buffs[attribute] || 0) + parsedValue,
        },
      }));
    }
  };

  const updateTotalValues = (newTotalValues) => {
    setTotalValues(newTotalValues);
  };

  useEffect(() => {
    const selectedCharacter = charactersData.find(
      (data) => encodeURIComponent(data.name) === encodeURIComponent(name)
    );
    if (selectedCharacter) {
      // Initialize standard buffs
      const standardBuffs = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      };

      setCharacterDetails({
        ...selectedCharacter,
        buffs: standardBuffs, // Use the standardBuffs object
      });
    }
  }, [name]);

  if (!characterDetails) {
    return <div>Loading...</div>;
  }

  // Calculate total value and modifier
  const totalModifiers = {};
  const totalValuesTmp = {};
  for (const attribute in characterDetails.attributes) {
    totalValuesTmp[attribute] =
      characterDetails.attributes[attribute] +
      characterDetails.buffs[attribute];
    totalModifiers[attribute] = calculateModifier(totalValuesTmp[attribute]);
  }

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        {/* Name */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom align="center">
            Character: {characterDetails.name}
          </Typography>
        </Grid>
        
        {/* Health */}
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: "1rem" }}>
            <HealthWidget maxHealth={characterDetails.hit_points.max} />
          </Paper>
        </Grid>

        {/* Initiative */}
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: "1rem" }}>
            <InitiativeRollWidget dexModifier={totalModifiers['dexterity']} improvedInitiative={true} />
            <BaseAttackBonusWidget classes={characterDetails.classes} />
          </Paper>
        </Grid>

        {/* Table For Attributes */}
        <Grid item xs={12}>
          <Paper style={{ padding: "1rem" }}>
            <AttributesTableWidget
              characterDetails={characterDetails}
              totalValues={totalValues}
              totalModifiers={totalModifiers}
              updateTotalValues={updateTotalValues}
              handleAddBuff={handleAddBuff}
            />
          </Paper>
        </Grid>

        
      </Grid>
    </Container>
  );
};

export default CharacterDetails;
