import AllGames from "./AllGamesOptions"
import "../TourneyDrawer.css"
import { Box, Stack, Tooltip, Typography } from "@mui/material"
import ApexLegendsOptions from "./ApexLegendsOptions"
import InfoIcon from "@mui/icons-material/Info"

import { FilterOptionsTab } from "../FilterOptionsSelection"
import { useEffect, useState } from "react"
import TestOptions from "./TestOptions"

const FilterOptions = ({ selectedTab }: { selectedTab: FilterOptionsTab }) => {
    const [filterValuesHaveChanged, setFilterValuesHaveChanged] = useState(false)

    useEffect(() => {
        return () => {
            // filterValuesHaveChanged? Send updated values to backend
            // pass handler function to all filter-option tabs
            // fire when any filter value in tab gets changed from initial values (and is still changed on unmount)
        }
    }, [])

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
