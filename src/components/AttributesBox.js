import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    IconButton,
    Select,
    MenuItem,
    Button,
    Card,
    CardContent
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const diceRollOptions = {
    "4d6 drop lowest": () => {
        const rolls = Array.from({
            length: 4
        }, () => Math.floor(Math.random() * 6) + 1);
        const lowestRoll = Math.min(... rolls);
        const sum = rolls.reduce((total, roll) => total + roll, 0) - lowestRoll;
        return sum;
    },
    "3d6": () => {
        return Array.from({
            length: 3
        }, () => Math.floor(Math.random() * 6) + 1).reduce((total, roll) => total + roll, 0);
    },
    "2d6 + 6": () => {
        const sum = Array.from({
            length: 2
        }, () => Math.floor(Math.random() * 6) + 1).reduce((total, roll) => total + roll, 0);
        return sum + 6;
    },
    "5d6 drop two lowest": () => {
        const rolls = Array.from({
            length: 5
        }, () => Math.floor(Math.random() * 6) + 1);
        const sortedRolls = rolls.sort((a, b) => a - b);
        const sum = sortedRolls.slice(2).reduce((total, roll) => total + roll, 0);
        return sum;
    },
    "1d20": () => {
        return Math.floor(Math.random() * 20) + 1;
    },
    "3d6 reroll 1s": () => {
        const rolls = Array.from({
            length: 3
        }, () => {
            let roll = Math.floor(Math.random() * 6) + 1;
            while (roll === 1) {
                roll = Math.floor(Math.random() * 6) + 1;
            }
            return roll;
        });
        return rolls.reduce((total, roll) => total + roll, 0);
    }
};

const AttributesBox = ({onAttributeSelect}) => {
    const [attributes, setAttributes] = useState({
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
    });

    const [rollOptionsVisible, setRollOptionsVisible] = useState(false);
    const [rollType, setRollType] = useState("manual"); // Default to manual rolling

    const handleIncrement = (attribute) => {
        setAttributes((prevAttributes) => ({
            ...prevAttributes,
            [attribute]: prevAttributes[attribute] + 1
        }));
    };

    const handleDecrement = (attribute) => {
        setAttributes((prevAttributes) => ({
            ...prevAttributes,
            [attribute]: prevAttributes[attribute] - 1
        }));
    };

    const handleRoll = () => {
        const rollFunction = diceRollOptions[rollType];
        if (rollFunction) {
            setAttributes({
                str: rollFunction(),
                dex: rollFunction(),
                con: rollFunction(),
                int: rollFunction(),
                wis: rollFunction(),
                cha: rollFunction()
            });
        }
    };

    useEffect(() => {
        onAttributeSelect(attributes);
    }, [attributes, onAttributeSelect]);

    const calculateModifier = (value) => Math.floor((value - 10) / 2);

    return (
        <div>
            <Typography variant="h5">Character Attributes:</Typography>
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Box p={4}>
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Button onClick={
                                () => setRollOptionsVisible(!rollOptionsVisible)
                            }>
                                Toggle Roll Options
                            </Button>
                            {
                            rollOptionsVisible && (
                                <Box ml={2}>
                                    <Select value={rollType}
                                        onChange={
                                            (event) => setRollType(event.target.value)
                                        }
                                        variant="outlined">
                                        <MenuItem value="manual">Manual</MenuItem>
                                        <MenuItem value="random">Random</MenuItem>
                                        {
                                        Object.keys(diceRollOptions).map((option) => (
                                            <MenuItem key={option}
                                                value={option}>
                                                {option} </MenuItem>
                                        ))
                                    } </Select>
                                    <Button variant="outlined"
                                        onClick={handleRoll}
                                        disabled={
                                            rollType === "manual"
                                    }>
                                        Roll for Stats
                                    </Button>
                                </Box>
                            )
                        } </Box>


<Box mt={2}>
                <table>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Modifier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(attributes).map(([attribute, value]) => (
                      <tr key={attribute}>
                        <td>{attribute}</td>
                        <td>
                          <Box display="flex" flexDirection="row" alignItems="center">
                            <IconButton
                              size="small"
                              onClick={() => handleDecrement(attribute)}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography variant="body1" color="textSecondary">
                              {value}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => handleIncrement(attribute)}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </td>
                        <td>
                          <Typography variant="caption" color="textSecondary">
                            {calculateModifier(value)}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>


              
                    </Box>

                </CardContent>
            </Card>
        </div>
    );
};

export default AttributesBox;
