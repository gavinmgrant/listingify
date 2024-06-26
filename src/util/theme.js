import React, { useEffect, useLayoutEffect, useState } from "react";
import { deepmerge } from "@mui/utils";
import {
  createTheme,
  useTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import * as colors from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createLocalStorageStateHook } from "use-local-storage-state";
import "@fontsource/alata";
import "@fontsource/roboto";

const headingFont = "'Alata', sans-serif";

const themeConfig = {
  // Light theme
  light: {
    palette: {
      mode: "light",
      primary: {
        main: colors.blueGrey[600],
      },
      secondary: {
        main: colors.orange[800],
      },
      background: {
        default: "#fff",
        // Background for elevated
        // components (<Card>, etc)
        paper: "#fff",
      },
    },
  },

  // Dark theme
  dark: {
    palette: {
      mode: "dark",
      primary: {
        main: colors.blueGrey[600],
      },
      secondary: {
        main: colors.orange[800],
      },
      background: {
        default: "#000",
        paper: colors.grey[900],
      },
    },
  },

  // Values for both themes
  common: {
    typography: {
      fontSize: 15,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      button: { fontWeight: 700 },
      h1: {
        fontFamily: headingFont,
        fontWeight: 700,
      },
      h2: {
        fontFamily: headingFont,
        fontWeight: 700,
      },
      h3: {
        fontFamily: headingFont,
        fontWeight: 600,
      },
      h4: {
        fontFamily: headingFont,
        fontWeight: 700,
      },
      h5: {
        fontFamily: headingFont,
        fontWeight: 700,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1200,
        xl: 1920,
      },
    },
    // Override component styles
    overrides: {
      // Global styles
      MuiCssBaseline: {
        "@global": {
          "#__next": {
            // Flex column that is height
            // of viewport so that footer
            // can push self to bottom by
            // with auto margin-top
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            // Prevent child elements from
            // shrinking when content
            // is taller than the screen
            // (quirk of flex parent)
            "& > *": {
              flexShrink: 0,
            },
          },
        },
      },
    },
  },
};

function getTheme(name) {
  // Create MUI theme from themeConfig
  return createTheme(
    deepmerge({
      ...themeConfig[name],
      // Merge in common values
      ...themeConfig.common,
      overrides: {
        // Merge overrides
        ...(themeConfig[name] && themeConfig[name].overrides),
        ...(themeConfig.common && themeConfig.common.overrides),
      },
    })
  );
}

// Create a local storage hook for dark mode preference
const useDarkModeStorage = createLocalStorageStateHook("isDarkMode");

export const ThemeProvider = (props) => {
  // Get system dark mode preference
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Get stored dark mode preference
  let [isDarkModeStored, setIsDarkModeStored] = useDarkModeStorage();

  // Only used stored preference after hydration to avoid client/server mismatch
  const hasHydrated = useHasHydrated();
  if (!hasHydrated) {
    isDarkModeStored = undefined;
  }

  // Use stored dark mode with fallback to system preference
  const isDarkMode =
    isDarkModeStored === undefined ? prefersDarkMode : isDarkModeStored;

  // Get MUI theme object
  const themeName = isDarkMode ? "dark" : "light";
  const theme = getTheme(themeName);

  // Add toggle function to theme object
  theme.palette.toggle = () => setIsDarkModeStored((value) => !value);

  // Since Next.js server-renders we need to remove
  // the server-side injected CSS on mount so the
  // client can take over with managing styles.
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      {/* Set global MUI styles */}
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
};

// Hook for detecting dark mode and toggling between light/dark
// More convenient than reading theme.palette.mode from useTheme
export function useDarkMode() {
  // Get current Material UI theme
  const theme = useTheme();
  // Check if it's the dark theme
  const isDarkMode = theme.palette.mode === "dark";
  // Return object containing dark mode value and toggle function
  return { value: isDarkMode, toggle: theme.palette.toggle };
}

// Hook that tells us when hydration is complete so that we can
// safely use the value returned by useDarkModeStorage without
// risking a mismatch between server and client.
// This will hopefully be built-in to the use-local-storage-state library soon
// See https://github.com/astoilkov/use-local-storage-state/issues/23
function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);

  const isServer = typeof window === "undefined";
  // To reduce flicker, we use `useLayoutEffect` so that app re-renders before
  // before React has painted to the browser.
  // React throws a warning when using useLayoutEffect on the server so
  // we use useEffect on the server (no-op) and useLayoutEffect in the browser.
  const useEffectFn = isServer ? useEffect : useLayoutEffect;

  useEffectFn(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
}
