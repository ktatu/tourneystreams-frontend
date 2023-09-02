import CloseIcon from "@mui/icons-material/Close"
import SettingsIcon from "@mui/icons-material/Settings"
import {
    Box,
    Checkbox,
    Divider,
    IconButton,
    Input,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Typography,
} from "@mui/material"
import { startTransition, useState } from "react"
import PopupMenu from "../../../commons/PopupMenu"
import useCheckbox from "../../../hooks/useCheckbox"
import "../Drawer.css"
import FilterOptionsSelection from "./FilterOptionsSelection"
import TourneyAccordions from "./tourney_accordion"

interface TournamentContentProps {
    handleDrawerClose: () => void
}
const TournamentContent = ({ handleDrawerClose }: TournamentContentProps) => {
    const [tourneyNameFilter, setTourneyNameFilter] = useState("")

    const [filterOptionsViewOpen, setFilterOptionsViewOpen] = useState(false)

    const handleTourneyNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setTourneyNameFilter(event.target.value)
        })
    }

    const handleSettingsViewVisibility = () => {
        setFilterOptionsViewOpen(!filterOptionsViewOpen)
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100%"
        >
            <Box className="drawer-content">
                <Typography variant="h4">Tournaments</Typography>
                <Box paddingTop={3}>
                    <Typography variant="body1">Filters:</Typography>
                    <Box
                        alignItems="center"
                        display="flex"
                        flexDirection="row"
                        gap={1}
                        paddingTop={1}
                    >
                        <Box paddingTop={1}>
                            <PopupMenu
                                buttonProps={{
                                    buttonText: "Games",
                                }}
                            >
                                <GameSelectionMenuContent />
                            </PopupMenu>
                        </Box>
                        <Input
                            disabled={filterOptionsViewOpen}
                            placeholder="Tournament name"
                            value={tourneyNameFilter}
                            endAdornment={
                                <IconButton
                                    sx={{
                                        visibility: tourneyNameFilter ? "visible" : "hidden",
                                    }}
                                    onClick={() => setTourneyNameFilter("")}
                                >
                                    <CloseIcon />
                                </IconButton>
                            }
                            onChange={handleTourneyNameFilterChange}
                        />
                        <Box flexGrow={1} />
                        <Box marginTop={1}>
                            <IconButton onClick={handleSettingsViewVisibility}>
                                {filterOptionsViewOpen ? (
                                    <CloseIcon fontSize="medium" />
                                ) : (
                                    <SettingsIcon fontSize="medium" />
                                )}
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider />
            {filterOptionsViewOpen ? (
                <FilterOptionsSelection />
            ) : (
                <TourneyAccordions tourneyNameFilter={tourneyNameFilter} />
            )}
        </Box>
    )
}

const GameSelectionMenuContent = () => {
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

interface MenuItemGameProps {
    gameId: string
    displayName: string
}

const MenuItemGame = ({ gameId, displayName }: MenuItemGameProps) => {
    const gameCheckbox = useCheckbox()

    return (
        <MenuItem>
            <ListItemIcon>
                <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{displayName}</ListItemText>
        </MenuItem>
    )
}

export default TournamentContent
