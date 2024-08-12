import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Box,
  IconButton,
  Container,
  Grid,
  Link,
} from "@mui/material";

import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import UploadPage from "./pages/UploadPage";
import { motion } from "framer-motion";
import logo from "./assets/logoz.png";
import { Background } from "./pages/components/Background";
import { BoxesCore } from "./ui/background-boxes";
import { BackgroundBoxes } from "./pages/components/Background2";
import { Background3 } from "./pages/components/Background3";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc",
    },
    background: {
      default: "#0d0d0d",
      paper: "#1c1c1c",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  typography: {
    fontFamily: [
      '"Bricolage Grotesque"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "3rem",
      fontWeight: 800,
      color: "#ffffff",
      letterSpacing: "0.05rem",
      marginBottom: "20px",
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 500,
      color: "#b0b0b0",
    },
  },
});

const CustomContainer = styled(Box)({
  padding: "10px 40px 40px 40px",
  backgroundColor: "#1c1c1caa",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  maxWidth: "1200px",
  width: "100%",
  margin: "auto",
  backdropFilter: "blur(10px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});


const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar className="bg-black">
          <img src={logo} alt="logo" width={250} />
        </Toolbar>
      </AppBar>
      <Background3 />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 0",
          opacity: 0.9,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <CustomContainer>
            <Typography variant="h1" align="center" maxWidth={600}>
              <TextGenerateEffect words="Click. Upload. Innovate. It's That Simple." />
            </Typography>
            <Typography variant="h6" align="center" paragraph>
              Let our AI analyze your Raspberry Pi components and conjure up
              personalized project ideas with detailed PDF guides.
            </Typography>
            <UploadPage />
          </CustomContainer>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default App;
