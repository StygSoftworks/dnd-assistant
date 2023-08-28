import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const InitiativeRollWidget = ({ dexModifier, improvedInitiative }) => {
  const [initiativeRoll, setInitiativeRoll] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const rollInitiative = () => {
    const rollResult = Math.floor(Math.random() * 20) + 1;
    const totalInitiative = rollResult + dexModifier + (improvedInitiative ? 4 : 0);
    setInitiativeRoll({ rollResult, totalInitiative });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box>
      <Button onClick={rollInitiative}>Roll Initiative</Button>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Initiative Roll Result</DialogTitle>
        <DialogContent>
          <Typography>
            Roll Result: {initiativeRoll?.rollResult}
            <br />
            Modifier: {dexModifier} Dex Modifier
            <br />
            Improved Initiative: {improvedInitiative ? "+ 4" : "None"}
            <br />
            Total Initiative: {initiativeRoll?.totalInitiative}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InitiativeRollWidget;
