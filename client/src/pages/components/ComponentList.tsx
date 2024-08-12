import React from "react";
import { Box, Typography, Grid, ListItem, ListItemText } from "@mui/material";
import { motion } from "framer-motion";

interface ComponentListProps {
  components: string[];
}

const ComponentList: React.FC<ComponentListProps> = ({ components }) => {
  const itemsPerRow = 3; // Number of items per row
  const rows = Math.ceil(components.length / itemsPerRow); // Number of rows required

  return (
    <Box
      sx={{
        mb: 4,
        mx: "auto",
        width: "100%",
        padding: 3,
        backgroundColor: "#1e1e1e",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.7)",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.9)",
        },
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: 600,
          color: "#00bfa5",
          letterSpacing: "0.05rem",
          marginBottom: 3,
          textTransform: "uppercase",
          fontSize: "1.5rem",
        }}
      >
        Components
      </Typography>
      <Grid container spacing={2}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Grid container item spacing={2} key={rowIndex}>
            {components
              .slice(
                rowIndex * itemsPerRow,
                rowIndex * itemsPerRow + itemsPerRow
              )
              .map((component, index) => (
                <Grid item xs={12 / itemsPerRow} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: (rowIndex * itemsPerRow + index) * 0.1,
                    }}
                  >
                    <ListItem
                      sx={{
                        padding: "12px 24px",
                        backgroundColor:
                          index % 2 === 0 ? "#2e2e2e" : "#252525",
                        borderRadius: "8px",
                        transition: "background-color 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "#333",
                        },
                      }}
                    >
                      <ListItemText
                        primary={component}
                        primaryTypographyProps={{
                          align: "center",
                          sx: {
                            color: "#fffb",
                            fontWeight: "medium",
                            fontSize: "1.1rem",
                          },
                        }}
                      />
                    </ListItem>
                  </motion.div>
                </Grid>
              ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ComponentList;
