import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        textAlign: "center",
        p: 2,
      }}
    >
      <Typography variant="body2">
        © 2025 My Website. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
