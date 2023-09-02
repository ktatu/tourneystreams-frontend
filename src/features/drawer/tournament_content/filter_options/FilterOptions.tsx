import InfoIcon from "@mui/icons-material/Info"
import { Box, Tooltip, Typography } from "@mui/material"
import "../TourneyDrawer.css"
import AllGames from "./AllGamesOptions"
import ApexLegendsOptions from "./ApexLegendsOptions"

import { useState } from "react"
import { FilterOptionsTab } from "../FilterOptionsSelection"
import TestOptions from "./TestOptions"

const FilterOptions = ({ selectedTab }: { selectedTab: FilterOptionsTab }) => {
    const [filterValuesHaveChanged, setFilterValuesHaveChanged] = useState(false)

    return (
        <Box className="drawer-container">
            <div hidden={selectedTab !== FilterOptionsTab.All}>
                <AllGames />
            </div>
            <div hidden={selectedTab !== FilterOptionsTab.ApexLegends}>
                <ApexLegendsOptions />
            </div>
            <div hidden={selectedTab !== FilterOptionsTab.Test}>
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
