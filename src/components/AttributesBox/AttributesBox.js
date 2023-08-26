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
import {diceRollOptions} from '../../functions';

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
								<Button onClick={() => setRollOptionsVisible(!rollOptionsVisible)}>
									Toggle Roll Options
								</Button>
								{rollOptionsVisible && (
									<Box ml={2}>
										<Select value={rollType}
											onChange={(event) => setRollType(event.target.value)}
											variant="outlined">
											<MenuItem value="manual">Manual</MenuItem>
											<MenuItem value="random">Random</MenuItem>
											{Object.keys(diceRollOptions).map((option) => (
												<MenuItem key={option}value={option}>
													{option}
												</MenuItem>
											))}
										</Select>
										<Button
											variant="outlined"
											onClick={handleRoll}
											disabled={rollType === "manual"}>
											Roll for Stats
										</Button>
									</Box>
								)}
						</Box>
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
														onClick={() => handleDecrement(attribute)}>
														<RemoveIcon />
													</IconButton>
													<Typography variant="body1" color="textSecondary">
														{value}
													</Typography>
													<IconButton
														size="small"
														onClick={() => handleIncrement(attribute)}>
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
