import AllGames from "./AllGamesOptions"
import "../TourneyDrawer.css"
import { Box, Stack, Tooltip, Typography } from "@mui/material"
import ApexLegendsOptions from "./ApexLegendsOptions"
import InfoIcon from "@mui/icons-material/Info"

import { OptionsTab } from "../ContentContainer"
import { useState } from "react"
import TestOptions from "./TestOptions"

const FilterOptions = ({ selectedTab }: { selectedTab: OptionsTab }) => {
    return (
        <Box className="drawer-container">
            <div hidden={selectedTab !== OptionsTab.All}>
                <AllGames />
            </div>
            <div hidden={selectedTab !== OptionsTab.ApexLegends}>
                <ApexLegendsOptions />
            </div>
            <div hidden={selectedTab !== OptionsTab.Test}>
                <TestOptions />
            </div>
        </Box>
    )
}

interface FilterOptionHeaderProps {
    optionTitle: string
    tooltipText?: string
}

export const FilterOptionHeader = ({ optionTitle, tooltipText }: FilterOptionHeaderProps) => {
    return (
        <>
            <Typography variant="h6">{optionTitle}</Typography>
            {tooltipText ? (
                <Tooltip
                    color="info"
                    placement="right-end"
                    title={tooltipText}
                >
                    <InfoIcon fontSize="small" />
                </Tooltip>
            ) : null}
        </>
    )
}

export default FilterOptions
