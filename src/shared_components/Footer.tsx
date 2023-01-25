import { textAlign } from "@mui/system"
import React from "react"

import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Box from "@mui/material/Box"

const Footer = () => {
    return (
        <Box sx={{ 
            bgcolor: "red",
            height: "6rem",
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
            position: "fixed",
            bottom: 0,
            width: "100%",
            padding: "1rem" 
        }}>
            <p>Content line 1</p>
            <p>Content line 2</p>
        </Box>
    )
}

export default Footer