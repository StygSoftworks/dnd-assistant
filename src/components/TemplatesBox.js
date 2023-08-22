import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

const TemplateBox = ({ onTemplateSelect }) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/templates") // Adjust the API endpoint accordingly
      .then((response) => response.json())
      .then((data) => {
        setTemplates(data);
      })
      .catch((error) => {
        console.error("Error fetching templates data:", error);
      });
  }, []);

  const handleTemplateSelect = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const selectedTemplateInfo = templates.find(
    (templateData) => templateData.name === selectedTemplate.name
  );

  useEffect(() => {
    onTemplateSelect(selectedTemplateInfo);
  }, [selectedTemplateInfo, onTemplateSelect]);

  return (
    <Box p={4}>
      <Typography variant="h5">Choose Templates</Typography>

          <FormControl fullWidth variant="outlined">
            <InputLabel>Select Template</InputLabel>
            <Select value={selectedTemplate} onChange={handleTemplateSelect}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {templates.map((templateData) => (
                <MenuItem key={templateData.name} value={templateData}>
                  {templateData.name}
                </MenuItem>
              ))}
            </Select>

            {selectedTemplateInfo && (
              <Card variant="outlined" sx={{ marginTop: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    {selectedTemplateInfo.name}
                  </Typography>
                  <Typography variant="body1">Hit Die: {selectedTemplateInfo.hit_dice}</Typography>
                  <Typography variant="body1">Level Adjustment: {selectedTemplateInfo.level_adjustment}</Typography>
                  <Typography variant="body1">Description: {selectedTemplateInfo.description}</Typography>
                  <Typography variant="body1">Natural Armor: {selectedTemplateInfo.natural_armor}</Typography>

                  {/* Display attribute fields */}
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Str</TableCell>
                          <TableCell>Dex</TableCell>
                          <TableCell>Con</TableCell>
                          <TableCell>Int</TableCell>
                          <TableCell>Wis</TableCell>
                          <TableCell>Cha</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            {selectedTemplateInfo.attributes.strength}
                          </TableCell>
                          <TableCell>
                            {selectedTemplateInfo.attributes.dexterity}
                          </TableCell>
                          <TableCell>
                            {selectedTemplateInfo.attributes.constitution}
                          </TableCell>
                          <TableCell>
                            {selectedTemplateInfo.attributes.intelligence}
                          </TableCell>
                          <TableCell>
                            {selectedTemplateInfo.attributes.wisdom}
                          </TableCell>
                          <TableCell>
                            {selectedTemplateInfo.attributes.charisma}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}
          </FormControl>

    </Box>
  );
};

export default TemplateBox;
