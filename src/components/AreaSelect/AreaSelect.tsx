import React, { useCallback, useMemo } from "react";
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

const AreaSelect: React.FC<AreaSelectProps> = React.memo(
  ({ areas, selectedAreas, setSelectedAreas }) => {
    const renderSelectedValue = useCallback((selected: string[]) => {
      if (selected.includes("all")) return "all";
      return selected.length === 0 ? "None" : selected.join(", ");
    }, []);

    const handleAreaChange = useCallback(
      (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];

        if (value.includes("all")) {
          setSelectedAreas(["all"]);
        } else {
          setSelectedAreas(value);
        }
      },
      [setSelectedAreas]
    );

    const filteredAreas = useMemo(() => {
      return areas.filter((area) => area.strArea);
    }, [areas]);

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
  }
);

export default AreaSelect;
