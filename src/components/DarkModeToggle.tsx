import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { useThemeMode } from "./ThemeModeContext";

const DarkModeToggle = () => {
  const { themeMode, toggleThemeMode } = useThemeMode();
  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton color="inherit" onClick={toggleThemeMode}>
        {themeMode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeToggle;
