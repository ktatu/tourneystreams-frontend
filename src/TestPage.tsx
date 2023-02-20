import React, { useState, useRef } from "react"

import { Divider, Drawer, Toolbar } from "@mui/material"

const TestPage = () => {
    return (
        <Drawer
            sx={{
                width: 500,
                flexShrink: 0,
                zIndex: -1000,
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <ul>
                <li>1</li>
                <li>2</li>
            </ul>
        </Drawer>
    )
}
// Esports Arena: Series E Season 6 Pro Tournament #4
// <TourneyCard tourneyName="Tourney 2"/>
export default TestPage
