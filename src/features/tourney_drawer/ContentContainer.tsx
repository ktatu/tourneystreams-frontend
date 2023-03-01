import {
    Box,
    Typography,
    Stack,
    Tabs,
    Tab,
    Chip,
    TextField,
    Checkbox,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
} from "@mui/material"
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

const ContentContainer = ({ filterOptionsViewOpen, tourneyInfoArray }: ContentContainerProps) => {
    const [tabsValue, setTabsValue] = useState(0)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log("new tab value ", newValue)
        setTabsValue(newValue)
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
                        value={tabsValue}
                        onChange={handleTabChange}
                        scrollButtons
                        allowScrollButtonsMobile
                        variant="scrollable"
                    >
                        <Tab label="All" />
                        <Tab label="Apex Legends" />
                        <Tab label="Counter Strike" />
                        <Tab label="Valorant" />
                    </Tabs>
                </Box>
                <FilterOptions selectedIndex={tabsValue} />
            </Stack>
        </Box>
    )
}

export default ContentContainer
