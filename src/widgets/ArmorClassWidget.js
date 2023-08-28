import React from "react";
import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

const ArmorClassWidget = ({ armorClass }) => {
    return (
        <Paper style={{ padding: "1rem" }}>
            <Typography variant="h6" gutterBottom>
                Armor Class
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Total Armor Class</TableCell>
                            <TableCell>{armorClass.total | 0}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Dexterity Modifier</TableCell>
                            <TableCell>{armorClass.dexMod | 0}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Armor AC</TableCell>
                            <TableCell>{armorClass.armorAC | 0}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Shield AC</TableCell>
                            <TableCell>{armorClass.shieldAC | 0}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Natural Armor</TableCell>
                            <TableCell>{armorClass.naturalArmor | 0}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Size Modifier</TableCell>
                            <TableCell>{armorClass.sizeMod | 0}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Deflection Modifier</TableCell>
                            <TableCell>{armorClass.deflectionMod | 0}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Miscellaneous Modifier</TableCell>
                            <TableCell>{armorClass.miscMod | 0}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ArmorClassWidget;
