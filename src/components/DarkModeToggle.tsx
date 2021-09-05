import React, { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

type DarkModeToggleProps = {
  onThemeChange: (darkMode: boolean) => void;
};

const DarkModeToggle = ({ onThemeChange }: DarkModeToggleProps) => {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    onThemeChange(!darkMode);
  };

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton color="inherit" onClick={handleThemeChange}>
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeToggle;
