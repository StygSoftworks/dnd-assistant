import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Typography, Paper, Grid, Box, Link } from "@mui/material";
import weaponsData from "../backend/data/weapons.json";

const WeaponDetails = () => {
  const { name } = useParams();
  const [weapon, setWeapon] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  const loadWeaponImage = (weaponName) => {
    const imageFormats = ["png", "jpg", "jpeg"];
    for (const format of imageFormats) {
      const potentialPath = `${
        window.location.origin
      }/images/weapons/${weaponName.replace(/[^a-zA-Z0-9]/g, "")}.${format}`;
      const img = new Image();
      img.onload = () => {
        setImagePath(potentialPath);
      };
      img.src = potentialPath;
    }
  };

  useEffect(() => {

    console.log(name);
    setWeapon(
      JSON.parse(
        JSON.stringify(
          weaponsData.find((data) => data.name === name)
        )
      )
    );
    loadWeaponImage(name);
  }, [name]);

  if (!weapon) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>
        Weapon Details: {weapon.name}
      </Typography>
      <Paper elevation={3} style={{ padding: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Type: {weapon.type}</Typography>
            <Typography variant="subtitle1">
              Proficiency: {weapon.proficiency}
            </Typography>
            <Typography variant="subtitle1">Damage: {weapon.damage}</Typography>
            <Typography variant="subtitle1">
              Damage Type: {weapon.damageType}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Critical: {weapon.critical}
            </Typography>
            <Typography variant="subtitle1">Range: {weapon.range}</Typography>
            <Typography variant="subtitle1">Weight: {weapon.weight}</Typography>
            <Typography variant="subtitle1">
              Properties: {weapon.properties.join(", ")}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography variant="subtitle1">
            Cost: {weapon.cost.value} {weapon.cost.currency}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1">{weapon.description}</Typography>
        </Box>
        <Box mt={2}>
          <img src={imagePath} alt={weapon.name} style={{ maxWidth: "100%" }} />
        </Box>
        <Box mt={2}>
          <Link
            component={RouterLink}
            to={{
              pathname: `/add-weapon/${encodeURIComponent(weapon.name)}`,
            }}
          >
            Edit Weapon
          </Link>
        </Box>
      </Paper>
    </div>
  );
};

export default WeaponDetails;
