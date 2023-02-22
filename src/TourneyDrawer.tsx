import {
    Box,
    Button,
    Checkbox,
    Divider,
    Drawer,
    IconButton,
    Input,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Toolbar,
    Typography,
} from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import useCheckbox from "./hooks/useCheckbox"
import PopupMenu from "./shared_components/PopupMenu"

import CloseIcon from "@mui/icons-material/Close"

import TourneyStartTime from "./TourneyStartTime"

import "./TourneyDrawer.css"
import TourneyAccordion from "./TourneyAccordion"
import { useState } from "react"

const TourneyDrawer = () => {
    const [tourneyNameFilter, setTourneyNameFilter] = useState("")

    return (
        <Drawer
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <Box className="drawer-container">
                <Box>
                    <Typography variant="h4">Tournaments</Typography>
                    <Box paddingTop={3}>
                        <Typography variant="body1">Filters:</Typography>
                        <Box
                            display="flex"
                            flexDirection="row"
                            paddingTop={1}
                            gap={1}
                        >
                            <PopupMenu
                                buttonProps={{
                                    buttonText: "Games",
                                }}
                                menuContent={<GameOptionsMenuContent />}
                            />
                            <Input
                                placeholder="Tournament name"
                                onChange={(event) => setTourneyNameFilter(event.target.value)}
                                value={tourneyNameFilter}
                                endAdornment={
                                    <IconButton
                                        onClick={() => setTourneyNameFilter("")}
                                        sx={{
                                            visibility: tourneyNameFilter ? "visible" : "hidden",
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
            <Box className="drawer-container">
                <Typography variant="h5">Today</Typography>
                <TourneyAccordion />
            </Box>
        </Drawer>
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

export default TourneyDrawer
