import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const IncrementDecrementButton = ({
    value,
    handleIncrement,
    handleDecrement,
}) => {
    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <IconButton size="small" onClick={handleDecrement}>
                <RemoveIcon />
            </IconButton>
            <Typography variant="body1" color="textSecondary">
                {value}
            </Typography>
            <IconButton size="small" onClick={handleIncrement}>
                <AddIcon />
            </IconButton>
        </Box>
    );
};

export default IncrementDecrementButton;
