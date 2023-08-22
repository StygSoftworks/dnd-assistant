import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Paper, Typography, MenuItem, InputAdornment } from '@mui/material';

const damageOptions = [
  '1d2', '1d3', '1d4', '1d6', '1d8', '1d10', '1d12', '2d4', '2d6', '2d8', '2d10', '2d12',
  '3d4', '3d6', '3d8', '3d10', '3d12', '4d4', '4d6', '4d8', '4d10', '4d12', '5d4', '5d6',
  '5d8', '5d10', '6d4', '6d6', '6d8', '6d10', '7d4', '7d6', '7d8', '8d4', '8d6'
];

const damageTypes = [
  'Bludgeoning', 'Piercing', 'Slashing',
  'Bludgeoning and Piercing', 'Bludgeoning and Slashing', 'Piercing and Slashing',
  'Bludgeoning or Piercing', 'Bludgeoning or Slashing', 'Piercing or Slashing',
  'Bludgeoning, Piercing, and Slashing',
];

const WeaponForm = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const { wepLookupName } = useParams();
  const [weapon, setWeapon] = useState({
    name: '',
    type: '',
    proficiency: '',
    damage: '',
    damageType: '',
    critical: '',
    range: '',
    weight: '',
    properties: [],
    cost: {
      value: '',
      currency: '',
    },
  });

  const [btnSubmitText, setBtnSubmitText] = useState("Add Weapon")

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  useEffect(() => {

    // If we have a weapon lookup name, fetch the weapon details
    if (!wepLookupName) {
      return;
    }

    //console.log('Fetching weapon details:', wepLookupName);


    fetch(`http://localhost:3001/api/details-weapon/${wepLookupName}`) // Adjust the API endpoint accordingly
      .then(response => response.json())
      .then(data => {
        console.log('Weapon details:', data);
        setWeapon(data);
        setBtnSubmitText("Update Weapon")
      
      })
      .catch(error => {
        console.error('Error fetching weapon details:', wepLookupName);
      });
  }, [wepLookupName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('weapon', JSON.stringify(weapon));

      const response = await fetch('http://localhost:3001/api/addWeapon', {
        method: 'POST',
        //headers: { 'Content-Type': 'application/json' },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {

        navigate('/weapons');
        setWeapon({
          name: '',
          type: '',
          proficiency: '',
          damage: '',
          damageType: '',
          critical: '',
          range: '',
          weight: '',
          properties: [],
          cost: { value: '', currency: '' },

          
        });

        // Navigate to "/weapons" after successfully adding a weapon
        navigate('/weapons');
        navigate('/weapons');

      } else {
        console.error('Failed to add weapon');
      }
    } catch (error) {
      console.error('There was an error adding the weapon', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            value={weapon.name}
            onChange={(e) => setWeapon((prev) => ({ ...prev, name: e.target.value }))}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select // Use 'select' for dropdown
            label="Damage Type"
            value={weapon.damageType}
            onChange={(e) => setWeapon((prev) => ({ ...prev, damageType: e.target.value }))}
          >
            {damageTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select // Use 'select' for dropdown
            label="Type"
            value={weapon.type}
            onChange={(e) => setWeapon((prev) => ({ ...prev, type: e.target.value }))}
          >
            <MenuItem value="Ranged">Ranged</MenuItem>
            <MenuItem value="Melee">Melee</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select // Use 'select' for dropdown
            label="Proficiency"
            value={weapon.proficiency}
            onChange={(e) => setWeapon((prev) => ({ ...prev, proficiency: e.target.value }))}
          >
            <MenuItem value="Simple">Simple</MenuItem>
            <MenuItem value="Martial">Martial</MenuItem>
            <MenuItem value="Exotic">Exotic</MenuItem>
            <MenuItem value="Natural">Natural</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select // Use 'select' for dropdown
            label="Damage"
            value={weapon.damage}
            onChange={(e) => setWeapon((prev) => ({ ...prev, damage: e.target.value }))}
          >
            {damageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>

          <TextField
            fullWidth
            label="Critical"
            value={weapon.critical}
            onChange={(e) => setWeapon((prev) => ({ ...prev, critical: e.target.value }))}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Range"
            value={weapon.range}
            onChange={(e) => setWeapon((prev) => ({ ...prev, range: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Weight"
            value={weapon.weight}
            onChange={(e) => setWeapon((prev) => ({ ...prev, weight: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Properties (comma-separated)"
            value={weapon.properties.join(', ')}
            onChange={(e) =>
              setWeapon((prev) => ({ ...prev, properties: e.target.value.split(', ') }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Cost (Value)"
            value={weapon.cost.value}
            onChange={(e) =>
              setWeapon((prev) => ({ ...prev, cost: { ...prev.cost, value: e.target.value } }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Cost (Currency)"
            value={weapon.cost.currency}
            onChange={(e) =>
              setWeapon((prev) => ({ ...prev, cost: { ...prev.cost, currency: e.target.value } }))
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label=""
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Grid>


        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            {btnSubmitText}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default WeaponForm;
