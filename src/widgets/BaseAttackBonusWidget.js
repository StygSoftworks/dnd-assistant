import React, { useState, useEffect } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classesData from "../backend/data/classes.json";
import classesPrestigeData from "../backend/data/classesPrestige.json";

import { calculateBaseAttackBonus,getClassBaseAttackBonus } from "../computation/dndMath";

const BaseAttackBonusWidget = ({ classes }) => {
  const [baseAttackBonus, setBaseAttackBonus] = useState(0);
  const [expanded, setExpanded] = useState(true); // Set the initial expanded state

  useEffect(() => {
    const totalBaseAttackBonus = calculateBaseAttackBonus(classes);
    setBaseAttackBonus(totalBaseAttackBonus);
  }, [classes]);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">BAB: {baseAttackBonus}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {classes.map((classInfo, index) => {
            let classData = classesData.find(
              (data) => data.name === classInfo.class
            );
            if (classData === undefined) {
              classData = classesPrestigeData.find(
                (data) => data.name === classInfo.class
              );
            }

            if (classData && classData.baseAttackBonus !== undefined) {
              const classBAB = getClassBaseAttackBonus(
                classData.baseAttackBonus
              );
              const classContrib = Math.floor(classBAB * classInfo.level);

              return (
                <div key={index}>
                  <Typography>Class: {classInfo.class}</Typography>
                  <Typography>Lvl: {classInfo.level}</Typography>
                  <Typography>BAB: {classContrib}</Typography>
                  <br />
                </div>
              );
            } else {
              return null;
            }
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default BaseAttackBonusWidget;
