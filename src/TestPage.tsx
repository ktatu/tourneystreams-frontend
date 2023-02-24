import React, { useState, useRef, useTransition } from "react"

import {
    Box,
    Checkbox,
    Divider,
    Drawer,
    IconButton,
    Input,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Toolbar,
    Typography,
} from "@mui/material"

import "./TourneyDrawer.css"
import PopupMenu from "./shared_components/PopupMenu"

import SettingsIcon from "@mui/icons-material/Settings"
import CloseIcon from "@mui/icons-material/Close"
import useCheckbox from "./hooks/useCheckbox"

const TestPage = () => {
    const [tourneyDetailsArray, setTourneyDetailsArray] = useState([
        { tourneyName: "BLAST.tv Paris Major 2023: European RMR A" },
    ])
    const [tourneyNameFilter, setTourneyNameFilter] = useState("")
    const [isPending, startTransition] = useTransition()

    const detailsFilteredByName = tourneyDetailsArray.filter((details) =>
        details.tourneyName.includes(tourneyNameFilter)
    )

    const handleTourneyNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setTourneyNameFilter(event.target.value)
        })
    }

    return (
        <Box>
            <Toolbar />
            <Paper sx={{ width: "25%" }}>
                <Box className="drawer-container">
                    <Box>
                        <Typography variant="h4">Tournaments</Typography>
                        <Box paddingTop={3}>
                            <Typography variant="body1">Filters:</Typography>
                            <Box
                                alignItems="center"
                                display="flex"
                                flexDirection="row"
                                paddingTop={1}
                                gap={1}
                            >
                                <Box paddingTop={1}>
                                    <PopupMenu
                                        buttonProps={{
                                            buttonText: "Games",
                                        }}
                                        menuContent={<GameOptionsMenuContent />}
                                    />
                                </Box>
                                <Input
                                    placeholder="Tournament name"
                                    onChange={handleTourneyNameFilterChange}
                                    value={tourneyNameFilter}
                                    endAdornment={
                                        <IconButton
                                            onClick={() => setTourneyNameFilter("")}
                                            sx={{
                                                visibility: tourneyNameFilter
                                                    ? "visible"
                                                    : "hidden",
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    }
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Divider />
            </Paper>
        </Box>
    )
}

const GameOptionsMenuContent = () => {
    const apexCheckbox = useCheckbox()
    const starcraftCheckbox = useCheckbox()

    return (
        <MenuList>
            <MenuItem onClick={apexCheckbox.handleToggle}>
                <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Apex Legends</ListItemText>
                <Checkbox checked={apexCheckbox.checked} />
            </MenuItem>
            <MenuItem onClick={starcraftCheckbox.handleToggle}>
                <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>StarCraft 2</ListItemText>
                <Checkbox checked={starcraftCheckbox.checked} />
            </MenuItem>
        </MenuList>
    )
}

export default TestPage
