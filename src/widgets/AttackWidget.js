import React from "react";
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const AttackWidget = ({ attacks }) => {
  return (
    <Paper style={{ padding: "1rem" }}>
      <Typography variant="h6" gutterBottom>
        Attacks
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Attack Bonus</TableCell>
              <TableCell>Attack Type</TableCell>
              <TableCell>Damage</TableCell>
              <TableCell>Damage Type</TableCell>
              <TableCell>Critical</TableCell>
              <TableCell>Range</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attacks.map((attack, index) => (
              <TableRow key={index}>
                <TableCell>{attack.name}</TableCell>
                <TableCell>{attack.attackBonus}</TableCell>
                <TableCell>{attack.attackType}</TableCell>
                <TableCell>{attack.damage}</TableCell>
                <TableCell>{attack.damageType}</TableCell>
                <TableCell>{attack.critical}</TableCell>
                <TableCell>{attack.range}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AttackWidget;
