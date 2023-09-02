/*import AllGames from "./AllGamesOptions"
import "../TourneyDrawer.css"
import { Box, Stack, Tooltip, Typography } from "@mui/material"
import ApexLegendsOptions from "./ApexLegendsOptions"
import InfoIcon from "@mui/icons-material/Info"

import { OptionsTab } from "../ContentContainer"
import { useState } from "react"

const FilterOptions = ({ selectedTab }: { selectedTab: OptionsTab }) => {
    return (
        <Box className="drawer-container">
            <div hidden={selectedTab !== OptionsTab.All}>
                <AllGames />
            </div>
            <div hidden={selectedTab !== OptionsTab.ApexLegends}>
                <ApexLegendsOptions />
            </div>
            <FilterTabContainer
                optionsTabValue={OptionsTab.Test}
                selectedTab={selectedTab}
            >
                <FilterOption>
                    <FilterOptionHeader optionTitle="Test title" tooltipText="This is a test" />
                </FilterOption>
            </FilterTabContainer>
        </Box>
    )
}

export default FilterOptions

interface FilterOptionProps {
    headerProps: FilterOptionHeaderProps
    children: JSX.Element
}

const FilterOption = ({ headerProps, children }: FilterOptionProps) => {
    const [optionData, setOptionData] = useState([])

    return (
        <>
            <Box display="flex" flexDirection="row" gap={1}>
                <FilterOptionHeader optionTitle={headerProps.optionTitle} tooltipText={headerProps.tooltipText} />
                
            </Box>
        </>
    )
}

interface FilterOptionHeaderProps {
    optionTitle: string
    tooltipText?: string
}

const FilterOptionHeader = ({ optionTitle, tooltipText }: FilterOptionHeaderProps) => {
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

interface FilterTabContainerProps {
    children: JSX.Element
    optionsTabValue: OptionsTab
    selectedTab: OptionsTab
}

const FilterTabContainer = ({
    children,
    optionsTabValue,
    selectedTab,
}: FilterTabContainerProps) => {
    return (
        <div hidden={selectedTab !== optionsTabValue}>
            <Stack
                direction="column"
                gap={8}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    gap={1}
                >
                    {children}
                </Box>
            </Stack>
        </div>
    )
}*/
export default {}
