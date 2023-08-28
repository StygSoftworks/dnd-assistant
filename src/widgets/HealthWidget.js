import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from "@mui/material";

const HealthWidget = ({ maxHealth }) => {
  const [currentHealth, setCurrentHealth] = useState(maxHealth);
  const [damageDialogOpen, setDamageDialogOpen] = useState(false);
  const [healDialogOpen, setHealDialogOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState("");

  const handleDamage = () => {
    setDialogValue("");
    setDamageDialogOpen(true);
  };

  const handleHeal = () => {
    setDialogValue("");
    setHealDialogOpen(true);

    //focus on the text field

  };

  const handleFullHeal = () => {
    setCurrentHealth(maxHealth);
  };

  const handleDamageDialogClose = () => {
    setDialogValue("");
    setDamageDialogOpen(false);
  };

  const handleHealDialogClose = () => {
    setDialogValue("");
    setHealDialogOpen(false);
  };

  const handleDamageDialogSubmit = (event) => {
    event.preventDefault();
    handleDamageConfirm();
  };

  const handleHealDialogSubmit = (event) => {
    event.preventDefault();
    handleHealConfirm();
  };

  const handleDamageConfirm = () => {
    const newValue = parseInt(dialogValue);
    if (!isNaN(newValue) && newValue >= 0) {
      setCurrentHealth(Math.max(currentHealth - newValue, 0));
    }
    setDialogValue("");
    setDamageDialogOpen(false);
  };

  const handleHealConfirm = () => {
    const newValue = parseInt(dialogValue);
    if (!isNaN(newValue) && newValue >= 0) {
      setCurrentHealth(Math.min(currentHealth + newValue, maxHealth));
    }
    setDialogValue("");
    setHealDialogOpen(false);


  };

  const handleHealthChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= maxHealth) {
      setCurrentHealth(newValue);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Health Widget</Typography>
      <Typography>
    <span>
    <TextField
      type="number"
      value={currentHealth}
      onChange={handleHealthChange}
      inputProps={{ min: 0, max: maxHealth }}
    />
  </span>{" "}
  / {maxHealth}
</Typography>

      <Button onClick={handleDamage}>Take Damage</Button>
      <Button onClick={handleHeal}>Heal</Button>
      <Button onClick={handleFullHeal}>Full Heal</Button>

      <Dialog open={damageDialogOpen} onClose={handleDamageDialogClose}>
        <form onSubmit={handleDamageDialogSubmit}>
          <DialogTitle>Take Damage</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={dialogValue}
              onChange={(e) => setDialogValue(e.target.value)}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">HP</InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDamageDialogClose}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={healDialogOpen} onClose={handleHealDialogClose}>
        <form onSubmit={handleHealDialogSubmit}>
          <DialogTitle>Heal</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={dialogValue}
              onChange={(e) => setDialogValue(e.target.value)}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">HP</InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleHealDialogClose}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default HealthWidget;
