import {
    Box,
    Button,
    Checkbox,
    Chip,
    Divider,
    Drawer,
    IconButton,
    Input,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Stack,
    Tab,
    Tabs,
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
import { useState, startTransition, useEffect } from "react"

import ISO from "iso-639-1"

import { TourneyInfo } from "./types"

const TourneyDrawer = () => {
    const [tourneyDetailsArray, setTourneyDetailsArray] = useState<Array<TourneyInfo>>([
        { tourneyName: "BLAST.tv Paris Major 2023: European RMR A", game: "apexlegends" },
    ])
    const [tourneyNameFilter, setTourneyNameFilter] = useState("")
    const [selectedGames, setSelectedGames] = useState()

    const [settingsViewOpen, setSettingsViewOpen] = useState(false)

    let filteredTourneys

    //useEffect(() => {}, [tourneyNameFilter, selectedGames])

    const detailsFilteredByName = tourneyDetailsArray.filter((details) =>
        details.tourneyName.includes(tourneyNameFilter)
    )

    const handleTourneyNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setTourneyNameFilter(event.target.value)
        })
    }

    const handleSettingsViewVisibility = () => {
        setSettingsViewOpen(!settingsViewOpen)
    }

    //const handleSelectedTourneysChange = () => {}

    return (
        <Drawer
            PaperProps={{ sx: { width: "25%" } }}
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
                                    menuContent={<GameSelectionMenuContent />}
                                />
                            </Box>
                            <Input
                                disabled={settingsViewOpen}
                                placeholder="Tournament name"
                                onChange={handleTourneyNameFilterChange}
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
                            <Box flexGrow={1} />
                            <Box marginTop={1}>
                                <IconButton onClick={handleSettingsViewVisibility}>
                                    {settingsViewOpen ? (
                                        <CloseIcon fontSize="medium" />
                                    ) : (
                                        <SettingsIcon fontSize="medium" />
                                    )}
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider />
            <TourneyDrawerContentContainer
                handleSettingsViewClose={handleSettingsViewVisibility}
                settingsViewOpen={settingsViewOpen}
                tourneyInfoArray={detailsFilteredByName}
            />
        </Drawer>
    )
}

interface TourneyDrawerContentContainerProps {
    handleSettingsViewClose: () => void
    settingsViewOpen: boolean
    tourneyInfoArray: Array<TourneyInfo>
}

const TourneyDrawerContentContainer = ({
    handleSettingsViewClose,
    settingsViewOpen,
    tourneyInfoArray,
}: TourneyDrawerContentContainerProps) => {
    const [tabsValue, setTabsValue] = useState(0)
    const [languages, setLanguages] = useState([
        "English",
        "Finnish",
        "Swedish",
        "German",
        "French",
        "Russian",
    ])

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabsValue(newValue)
    }

    const handleLanguageChipDeletion = () => {
        console.log("delete")
    }

    const handleLanguageSelection = (language: string) => {
        setLanguages(languages.concat(language))
    }

    if (!settingsViewOpen) {
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
                <Box className="drawer-container">
                    <Stack
                        direction="column"
                        gap={1}
                    >
                        <Box
                            display="flex"
                            flexDirection="row"
                            gap={2}
                        >
                            <Typography variant="h6">Languages</Typography>
                            <Box>
                                <PopupMenu
                                    buttonProps={{
                                        buttonText: "Add More",
                                    }}
                                    menuContent={
                                        <LanguageSelectionMenuContent
                                            handleLanguageSelection={handleLanguageSelection}
                                            selectedLanguages={languages}
                                        />
                                    }
                                />
                            </Box>
                        </Box>
                        <span>
                            Displayed tournaments must include a stream in at least one of the
                            following languages:
                        </span>
                        <Box
                            display="flex"
                            flexDirection="row"
                            flexWrap="wrap"
                            gap={1}
                        >
                            {languages.map((language) => (
                                <Chip
                                    key={language}
                                    label={language}
                                    onDelete={handleLanguageChipDeletion}
                                />
                            ))}
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

interface LanguageSelectionMenuContentProps {
    handleLanguageSelection: (language: string) => void
    selectedLanguages: Array<string>
}

const LanguageSelectionMenuContent = ({
    handleLanguageSelection,
    selectedLanguages,
}: LanguageSelectionMenuContentProps) => {
    const languages = ISO.getAllNames().sort((a, b) => (a < b ? -1 : 1))

    return (
        <MenuList sx={{ maxHeight: "200px" }}>
            {languages.map((language) => (
                <MenuItem
                    key={language}
                    onClick={() => handleLanguageSelection(language)}
                    disabled={selectedLanguages.includes(language) ? true : false}
                >
                    <ListItemText>{language}</ListItemText>
                </MenuItem>
            ))}
        </MenuList>
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

export default TourneyDrawer
