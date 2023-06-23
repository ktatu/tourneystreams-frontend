import { Box, Typography, Stack, Tabs, Tab } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import { FixedSizeList, ListChildComponentProps } from "react-window"
import useCheckbox from "../../../hooks/useCheckbox"
import PopupMenu, { PopupMenuClose } from "../../../commons/PopupMenu"
import FilterOptions from "./filter_options/FilterOptions"
import TourneyAccordion from "./tourney_accordion/TourneyAccordion"

export enum FilterOptionsTab {
    All = "All",
    ApexLegends = "Apex Legends",
    Test = "Test",
}

const FilterOptionsSelection = () => {
    const [optionsTabValue, setOptionsTabValue] = useState<FilterOptionsTab>(FilterOptionsTab.All)

    const handleTabChange = (event: React.SyntheticEvent, newValue: FilterOptionsTab) => {
        setOptionsTabValue(newValue)
    }

    return (
        <Box paddingTop={3}>
            <Stack
                direction="column"
                gap={1}
            >
                <Box>
                    <Tabs
                        value={optionsTabValue}
                        onChange={handleTabChange}
                        scrollButtons
                        allowScrollButtonsMobile
                        variant="scrollable"
                    >
                        <Tab
                            value={FilterOptionsTab.All}
                            label="All"
                        />
                        <Tab
                            value={FilterOptionsTab.ApexLegends}
                            label="Apex Legends"
                        />
                        <Tab
                            value={FilterOptionsTab.Test}
                            label="Test tab"
                        />
                    </Tabs>
                </Box>
                <FilterOptions selectedTab={optionsTabValue} />
            </Stack>
        </Box>
    )
}

export default FilterOptionsSelection
