import { Box, Stack, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import FilterOptions from "./filter_options/FilterOptions"

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
                        allowScrollButtonsMobile
                        scrollButtons
                        value={optionsTabValue}
                        variant="scrollable"
                        onChange={handleTabChange}
                    >
                        <Tab
                            label="All"
                            value={FilterOptionsTab.All}
                        />
                        <Tab
                            label="Apex Legends"
                            value={FilterOptionsTab.ApexLegends}
                        />
                        <Tab
                            label="Test tab"
                            value={FilterOptionsTab.Test}
                        />
                    </Tabs>
                </Box>
                <FilterOptions selectedTab={optionsTabValue} />
            </Stack>
        </Box>
    )
}

export default FilterOptionsSelection
