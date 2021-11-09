import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import { createTheme, PaletteType, ThemeProvider } from "@material-ui/core";

const useThemeModeProvider = () => {
  const [themeMode, setThemeMode] = useState<PaletteType>("light");

  const toggleThemeMode = useCallback(() => {
    setThemeMode(prevMode => (prevMode === "light" ? "dark" : "light"));
  }, []);

  return { themeMode, toggleThemeMode };
};

export const useThemeMode = () => useContext(ThemeModeContext);

const ThemeModeContext = createContext(
  {} as ReturnType<typeof useThemeModeProvider>
);

const ThemeModeProvider: FunctionComponent = ({ children }) => {
  const context = useThemeModeProvider();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: context.themeMode
        }
      }),
    [context.themeMode]
  );
  return (
    <ThemeModeContext.Provider value={context}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
