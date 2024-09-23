import React, { ReactNode } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { AreaSelectProps } from "../../types/productTypes";

const renderSelectedValue = (selected: string[]) => {
  if (selected.includes("all")) return "all";
  return selected.length === 0 ? "None" : selected.join(", ");
};

type HandleChangeType = (
  event: SelectChangeEvent<string[]>,
  child: ReactNode
) => void;

const AreaSelect: React.FC<AreaSelectProps> = ({
  areas,
  selectedAreas,
  setSelectedAreas,
}) => {
  const handleAreaChange: HandleChangeType = (event) => {
    const value = event.target.value as string[];

    if (value.includes("all")) {
      setSelectedAreas(["all"]);
    } else {
      setSelectedAreas(value);
    }
  };

  const filteredAreas = areas.filter((area) => area.strArea);
  const allSelected = selectedAreas.includes("all");

  return (
    <FormControl sx={{ width: "200px" }}>
      <InputLabel id="area-select-label">Area</InputLabel>
      <Select
        labelId="area-select-label"
        multiple
        value={selectedAreas}
        onChange={handleAreaChange}
        renderValue={renderSelectedValue}
      >
        <MenuItem key="all" value="all">
          <Checkbox checked={allSelected} />
          <ListItemText primary="All" />
        </MenuItem>

        {filteredAreas.map((area) => (
          <MenuItem
            key={area.strArea}
            value={area.strArea}
            disabled={allSelected}
          >
            <Checkbox checked={selectedAreas.includes(area.strArea!)} />
            <ListItemText primary={area.strArea} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AreaSelect;
