import React from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Typography
} from "@mui/material";

const CustomTable = ({ columns, rows }) => {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ maxWidth: 700, mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.label} sx={{ fontWeight: "bold" }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col, j) => {
                const value = row[col.key];
                const isOperator = col.key === "operator";
                const isMonospace = col.monospace;

                return (
                  <TableCell key={j} >
                    {isOperator ? (
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 1,
                          py: 0.5,
                          bgcolor: "#f0f0f0",
                          borderRadius: "4px",
                          fontFamily: "monospace",
                        }}
                      >
                        {value}
                      </Box>
                    ) : isMonospace ? (
                      <Typography fontFamily="monospace">{value}</Typography>
                    ) : (
                      <Typography>{value}</Typography>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
