import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e0e0e0", 
    },
    secondary: {
      main: "#0056b3", 
    },
    background: {
      default: "#e0e0e0", 
      paper: "#ffffff", 
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: "20px", 
          paddingBottom: "40px", 
        },
      },
    },
  },
});

export default theme;
