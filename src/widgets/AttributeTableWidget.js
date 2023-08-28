import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

import IncrementDecrementButton from "../widgets/IncrementDecrementButton";
import { TableHeader, CenteredTableCell } from "../components/styles";
import WildShapeWidget from "./WildShapeWidget";
import { calculateModifier } from "../computation/dndMath";
const AttributesTableWidget = ({
  characterDetails,
  totalValues,
  handleAddBuff,
  updateTotalValues, // New prop to update totalValues in the parent
}) => {
  const [wildShapeAttributes, setWildShapeAttributes] = useState(null);

  useEffect(() => {
    if (wildShapeAttributes) {
      const updatedTotalValues = { ...totalValues };

      for (const attribute in wildShapeAttributes) {
        updatedTotalValues[attribute] =
          wildShapeAttributes[attribute] + characterDetails.buffs[attribute];
      }

      // Update the totalValues in the parent component
      updateTotalValues(updatedTotalValues); // new method to update the parent state
    }
  }, [wildShapeAttributes, characterDetails.buffs, updateTotalValues]);

  const handleWildShapeFormChange = (attributes) => {
    setWildShapeAttributes(attributes);
  };

  const attributesToUse = wildShapeAttributes || characterDetails.attributes;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Stats
      </Typography>
      <div style={{ overflowX: "auto" }}>
        <table style={{ minWidth: 400 }}>
          <thead>
            <tr>
              <TableHeader>Attr</TableHeader>
              <TableHeader>Val</TableHeader>
              <TableHeader>Buff</TableHeader>
              <TableHeader>Total</TableHeader>
            </tr>
          </thead>
          <tbody>
            {attributesToUse &&
              Object.keys(attributesToUse).map((attribute) => (
                <tr key={attribute}>
                  <CenteredTableCell>
                    {attribute.charAt(0).toUpperCase() + attribute.slice(1, 3)}
                  </CenteredTableCell>
                  <CenteredTableCell>
                    {attributesToUse[attribute]}
                  </CenteredTableCell>
                  <CenteredTableCell>
                    <IncrementDecrementButton
                      value={characterDetails.buffs[attribute]}
                      handleIncrement={() => handleAddBuff(attribute, 1)}
                      handleDecrement={() => handleAddBuff(attribute, -1)}
                    />
                  </CenteredTableCell>
                  <CenteredTableCell>
                    {totalValues[attribute] } ({calculateModifier(totalValues[attribute]) >= 0 ? "+" : ""}
                    {calculateModifier(totalValues[attribute])})
                  </CenteredTableCell>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <WildShapeWidget
  characterDetails={characterDetails}
  onFormChange={handleWildShapeFormChange}
  totalValues={totalValues} // Pass totalValues as a prop
/>

    </Box>
  );
};

export default AttributesTableWidget;
