import { Box, Typography, Stack, Tabs, Tab } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import { FixedSizeList, ListChildComponentProps } from "react-window"
import useCheckbox from "../../hooks/useCheckbox"
import PopupMenu, { PopupMenuClose } from "../../shared_components/PopupMenu"
import { TourneyInfo } from "../../types"
import FilterOptions from "./filter_options/FilterOptions"
import TourneyAccordion from "./TourneyAccordion"

interface ContentContainerProps {
    filterOptionsViewOpen: boolean
    tourneyInfoArray: Array<TourneyInfo>
}

export enum OptionsTab {
    All = "all",
    ApexLegends = "apexlegends",
    Test = "test",
}

const ContentContainer = ({ filterOptionsViewOpen, tourneyInfoArray }: ContentContainerProps) => {
    const [optionsTabValue, setOptionsTabValue] = useState<OptionsTab>(OptionsTab.All)

    const handleTabChange = (event: React.SyntheticEvent, newValue: OptionsTab) => {
        setOptionsTabValue(newValue)
    }

    if (!filterOptionsViewOpen) {
        return (
            <Box className="drawer-container">
                <Typography variant="h5">Today</Typography>
                {tourneyInfoArray.map((tourney) => (
                    <TourneyAccordion
                        key={tourney.tourneyName}
                        tourneyName={tourney.tourneyName}
                    />
                ))}
            </Box>
        )
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
                            value={OptionsTab.All}
                            label="All"
                        />
                        <Tab
                            value={OptionsTab.ApexLegends}
                            label="Apex Legends"
                        />
                        <Tab
                            value={OptionsTab.Test}
                            label="Test tab"
                        />
                    </Tabs>
                </Box>
                <FilterOptions selectedTab={optionsTabValue} />
            </Stack>
        </Box>
    )
}

export default ContentContainer
