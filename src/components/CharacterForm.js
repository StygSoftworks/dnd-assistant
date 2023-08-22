import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";
import AttributesBox from "./AttributesBox";
import ClassBox from "./ClassBox";
import RaceBox from "./RaceBox";
import TemplateBox from "./TemplatesBox";
import AlignmentBox from "./AlignmentBox";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CharacterForm = () => {
  const [attributes, setAttributes] = useState({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  });

  const handleAttributeChange = (attribute, value) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: value,
    }));
  };

  const [racialAttributes, setRacialAttributes] = useState({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  });

  const handleRaceSelect = (selectedRaceAttributes) => {
    setRacialAttributes(selectedRaceAttributes);
  };

  const [alignment, setAlignment] = useState("");

  const handleAlignmentSelect = (selectedAlignment) => {
    setAlignment(selectedAlignment);
  };


  const [classesData, setClassesData] = useState([]);

  const [templateData, setTemplateData] = useState([]);

  const handleClassSelect = (selectedClass) => {
    setClassesData((prevClassesData) => {
      const newClassesData = [...prevClassesData];
      newClassesData.push(selectedClass);
      return newClassesData;
    });
  };

  const [character, setCharacter] = useState({
    name: "",
    race: "",
    classes: [
      {
        class: "",
        level: "",
      },
    ],
    alignment: "",
    attributes: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    hit_points: {
      current: 0,
      max: 0,
    },
    skills: {},
    feats: [
      {
        name: "",
        givenBy: "",
        source: "",
        Rules: "",
      },
    ],
    inventory: [
      {
        name: "",
        type: "",
        damage: "",
        critical: "",
        armor_class: 0,
      },
    ],
  });

  const totalAttributes = {
    strength:
      (attributes.str || 0) +
      (racialAttributes?.ability_bonuses?.str || 0) +
      (templateData?.attributes?.strength || 0),
    dexterity:
      (attributes.dex || 0) +
      (racialAttributes?.ability_bonuses?.dex || 0) +
      (templateData?.attributes?.dexterity || 0),
    constitution:
      (attributes.con || 0) +
      (racialAttributes?.ability_bonuses?.con || 0) +
      (templateData?.attributes?.constitution || 0),
    intelligence:
      (attributes.int || 0) +
      (racialAttributes?.ability_bonuses?.int || 0) +
      (templateData?.attributes?.intelligence || 0),
    wisdom:
      (attributes.wis || 0) +
      (racialAttributes?.ability_bonuses?.wis || 0) +
      (templateData?.attributes?.wisdom || 0),
    charisma:
      (attributes.cha || 0) +
      (racialAttributes?.ability_bonuses?.cha || 0) +
      (templateData?.attributes?.charisma || 0),
  };

  const handleSubmit = () => {
    console.log("Total Attributes: ");
    console.log(JSON.stringify(totalAttributes, null, 2));

    console.log("Racial Attributes: ");
    console.log(JSON.stringify(racialAttributes, null, 2));

    console.log("Character Attributes: ");
    console.log(JSON.stringify(attributes, null, 2));

    console.log("Classes: ");
    console.log(JSON.stringify(classesData, null, 2));
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Character Form
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={character.name}
        onChange={(e) =>
          setCharacter((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      />

      <AlignmentBox
        onAlignmentSelect={(selectedAlignment) =>
          setAlignment(selectedAlignment)
        }
      />

      <RaceBox
        onRaceSelect={(selectedRaceAttributes) =>
          setRacialAttributes(selectedRaceAttributes)
        }
      />

<TemplateBox onTemplateSelect={(templateData) => setTemplateData(templateData)}/>

      <AttributesBox
        onAttributeSelect={(attribute) => setAttributes(attribute)}
      />

      <ClassBox onClassSelect={(classesData) => setClassesData(classesData)} />



      <Typography variant="h6" gutterBottom>
        Total Attributes
      </Typography>

      {/* Display attribute fields */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Str</TableCell>
              <TableCell>Dex</TableCell>
              <TableCell>Con</TableCell>
              <TableCell>Int</TableCell>
              <TableCell>Wis</TableCell>
              <TableCell>Cha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{totalAttributes.strength}</TableCell>
              <TableCell>{totalAttributes.dexterity}</TableCell>
              <TableCell>{totalAttributes.constitution}</TableCell>
              <TableCell>{totalAttributes.intelligence}</TableCell>
              <TableCell>{totalAttributes.wisdom}</TableCell>
              <TableCell>{totalAttributes.charisma}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Paper>
  );
};

export default CharacterForm;
