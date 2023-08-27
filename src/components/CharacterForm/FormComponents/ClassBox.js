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
} from "@mui/material";

const ClassBox = ({ onClassSelect }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [totalLevel, setTotalLevel] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/api/classes") // Adjust the API endpoint accordingly
      .then((response) => response.json())
      .then((data) => {
        setClasses(data);
      })
      .catch((error) => {
        console.error("Error fetching classes data:", error);
      });
  }, []);

  const handleClassSelect = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleAddLevel = () => {
    if (selectedClass) {
      const selectedClassData = classes.find(
        (classData) => classData.name === selectedClass.name
      );
      setSelectedClasses((prevSelectedClasses) => {
        const newSelectedClasses = [...prevSelectedClasses];
        newSelectedClasses.push({ classData: selectedClassData });
        setTotalLevel((prevTotal) => prevTotal + 1);
        return newSelectedClasses;
      });
    }
  };

  useEffect(() => {
    onClassSelect(selectedClasses);
  }, [selectedClasses, onClassSelect]);

  const handleClassRemove = (classData) => {
    setSelectedClasses((prevSelectedClasses) => {
      const newSelectedClasses = prevSelectedClasses.filter(entry => entry.classData !== classData);
      setTotalLevel((prevTotal) => prevTotal - 1);
      return newSelectedClasses;
    });
  };

  const selectedClassInfo = classes.find(
    (classData) => classData.name === selectedClass.name
  );

  return (
    <div>
      <Typography variant="h5">Choose Classes</Typography>
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Select Class</InputLabel>
            <Select value={selectedClass} onChange={handleClassSelect}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {classes.map((classData) => (
                <MenuItem key={classData.name} value={classData}>
                  {classData.name}
                </MenuItem>
              ))}
            </Select>
            {selectedClassInfo && (
              <Card variant="outlined" sx={{ marginTop: 2 }}>
                <CardContent>
                  <Typography variant="h6">{selectedClassInfo.name}</Typography>
                  <Typography variant="body1">
                    Hit Die: {selectedClassInfo.hitDie}
                  </Typography>
                  {/* Add more class info fields as needed */}
                  <Typography variant="body1">
                    Description: {selectedClassInfo.description}
                  </Typography>
                  {/* Display other class information here */}
                </CardContent>
              </Card>
            )}
          </FormControl>
          <Button
            variant="outlined"
            onClick={handleAddLevel}
            sx={{ marginTop: "1rem" }}
					>
            Add Level
          </Button>
        </CardContent>
      </Card>
      <Typography variant="h5">Selected Classes</Typography>
				{selectedClasses.map((entry, index) => (
					<div
						key={`${entry.classData.name}-${index}`}
						style={{
							marginBottom: "1rem",
							display: "flex",
							justifyContent: "space-between",
						}}
					>
          <Typography variant="body1">
            {entry.classData.name} - Level{" "}
            {selectedClasses
							.slice(0, index + 1)
							.filter((e) => e.classData.name === entry.classData.name).length
						}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleClassRemove(entry.classData)}
					>
            Remove
          </Button>
        </div>
      ))}
      <Typography variant="body1">Total Level - {totalLevel}</Typography>
    </div>
  );
};

export default ClassBox;
