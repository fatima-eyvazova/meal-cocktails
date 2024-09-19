import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";

interface AreaSelectProps {
  areas: { strArea?: string }[];
  selectedAreas: string[];
  setSelectedAreas: React.Dispatch<React.SetStateAction<string[]>>;
}

const renderSelectedValue = (selected: string[]) => {
  if (selected.includes("all")) return "all";
  return selected.length === 0 ? "None" : selected.join(", ");
};

const AreaSelect: React.FC<AreaSelectProps> = ({
  areas,
  selectedAreas,
  setSelectedAreas,
}) => {
  const handleAreaChange = (event: React.ChangeEvent<{ value: unknown }>) => {
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
