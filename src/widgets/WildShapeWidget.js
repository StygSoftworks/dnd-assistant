import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Select,
  MenuItem,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";

import wildshapeData from "../backend/data/wildshapes.json";
import naturalWeaponsData from "../backend/data/naturalWeapons.json";
import sizesData from "../backend/data/sizes.json";
import {
  calculateModifier,
  calculateBaseAttackBonus,
  rollDice,
} from "../computation/dndMath";
import { TableHeader } from "../components/styles";

const WildShapeWidget = ({ characterDetails, onFormChange, totalValues }) => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAttack, setSelectedAttack] = useState(null);
  const [dialogData, setDialogData] = useState(null);

  const handleFormChange = (event) => {
    const selectedFormName = event.target.value;
    const selectedFormDetails = wildshapeData.find(
      (form) => form.name === selectedFormName
    );

    setSelectedForm(selectedFormDetails);
  };

  const handleSizeChange = (attackName, newSize) => {
    const updatedAttacks = selectedForm.attacks.map((attack) => {
      if (attack.name === attackName) {
        return {
          ...attack,
          size: newSize,
        };
      }
      return attack;
    });

    const updatedForm = {
      ...selectedForm,
      attacks: updatedAttacks,
    };

    setSelectedForm(updatedForm);
  };

  const handleRollAttack = (attack) => {
    setSelectedAttack(attack);

    //set dialog values HERE
    const dialogDataTmp = {
      damage: getNaturalAttackInfo(attack.name).damage[
        attack.size || selectedForm.size
      ],
      strBonus: calculateModifier(totalValues["strength"]),
      baseAttackBonus: calculateBaseAttackBonus(characterDetails.classes),
      attackRollResult: rollDice("1d20"),
      damageRoll: rollDice(
        getNaturalAttackInfo(attack.name).damage[
          attack.size || selectedForm.size
        ]
      ),
      dice: getNaturalAttackInfo(attack.name).damage[
        attack.size || selectedForm.size
      ],

    };

    setDialogData(dialogDataTmp);

    setOpenDialog(true);
  };

  useEffect(() => {
    const createFormAttributes = () => ({
      ...selectedForm.attributes,
      intelligence: characterDetails.attributes.intelligence,
      wisdom: characterDetails.attributes.wisdom,
      charisma: characterDetails.attributes.charisma,
    });

    const newAttributes = selectedForm
      ? createFormAttributes()
      : characterDetails.attributes;

    onFormChange(newAttributes);
  }, [selectedForm, onFormChange, characterDetails]);

  const getNaturalAttackInfo = (attackType) => {
    return naturalWeaponsData.find((attack) => attack.type === attackType);
  };

  return (
    <Paper style={{ padding: "1rem" }}>
      <Typography variant="h6" gutterBottom>
        Wild Shape Widget
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Select
            value={selectedForm ? selectedForm.name : ""}
            onChange={handleFormChange}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="">Base Form</MenuItem>
            {wildshapeData.map((form) => (
              <MenuItem key={form.name} value={form.name}>
                {form.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {selectedForm && (
          <Grid item xs={12} md={6}>

            <Typography variant="subtitle1" gutterBottom>
              Description: {selectedForm.description}
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              Combat: {selectedForm.combat}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Wild Shape Form Size: {selectedForm.size}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Hit Dice: {selectedForm.hit_dice}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Natural AC: {selectedForm.natural_armor}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Armor: {10+selectedForm.natural_armor+calculateModifier(totalValues["dexterity"])} = 10 + {selectedForm.natural_armor} + {calculateModifier(totalValues["dexterity"])}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Natural Attacks:
            </Typography>
            {selectedForm.attacks.map((attack) => (
              <div
                key={attack.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <Typography variant="body2" style={{ marginRight: "8px" }}>
                  {`${attack.name}: ${attack.amount} ${
                    getNaturalAttackInfo(attack.name).damage[
                      attack.size || selectedForm.size
                    ]
                  } damage`}
                </Typography>
                <Select
                  value={attack.size || selectedForm.size} // Use attack size or selectedForm size
                  onChange={(event) =>
                    handleSizeChange(attack.name, event.target.value)
                  }
                  style={{ minWidth: "80px" }}
                >
                  {sizesData.map((size) => (
                    <MenuItem key={size.name} value={size.name}>
                      {size.name}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  variant="outlined"
                  onClick={() => handleRollAttack(attack)}
                >
                  Roll Attack
                </Button>
              </div>
            ))}
          </Grid>
        )}
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedAttack && selectedAttack.name}</DialogTitle>
        <DialogContent>
          {selectedAttack && selectedForm && (
            <div>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Attack</TableCell>
                      <TableCell>BAB</TableCell>
                      <TableCell>Roll(1d20)</TableCell>
                      <TableCell>Str</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {dialogData.attackRollResult +
                          dialogData.baseAttackBonus +
                          dialogData.strBonus}
                      </TableCell>
                      <TableCell>{dialogData.baseAttackBonus}</TableCell>
                      <TableCell>{dialogData.attackRollResult}</TableCell>
                      <TableCell>{dialogData.strBonus}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Damage</TableCell>
                      <TableCell>Roll({dialogData.dice})</TableCell>
                      <TableCell>Str</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {dialogData.damageRoll + dialogData.strBonus}
                      </TableCell>
                      <TableCell>{dialogData.damageRoll}</TableCell>
                      <TableCell>{dialogData.strBonus}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default WildShapeWidget;
