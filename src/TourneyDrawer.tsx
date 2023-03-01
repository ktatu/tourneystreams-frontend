import {
    Box,
    Button,
    Checkbox,
    Chip,
    Divider,
    Drawer,
    IconButton,
    Input,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Stack,
    Tab,
    Tabs,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import useCheckbox from "./hooks/useCheckbox"
import PopupMenu, { PopupMenuClose } from "./shared_components/PopupMenu"

import CloseIcon from "@mui/icons-material/Close"

import TourneyStartTime from "./TourneyStartTime"

import "./TourneyDrawer.css"
import TourneyAccordion from "./TourneyAccordion"
import { startTransition, useEffect, useRef, useState } from "react"

import ISO from "iso-639-1"
import { FixedSizeList, ListChildComponentProps } from "react-window"

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

    useEffect(() => {
        const sortedLanguages = languages.sort((languageA, languageB) =>
            languageA < languageB ? -1 : 1
        )
        setLanguages(sortedLanguages)
    }, [languages])

    const popupMenuRef = useRef<PopupMenuClose>(null)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabsValue(newValue)
    }

    const handleLanguageChipDeletion = (languageToDelete: string) => {
        setLanguages(languages.filter((language) => language !== languageToDelete))
    }

    const handleLanguageSelection = (language: string) => {
        setLanguages(languages.concat(language))
        popupMenuRef.current?.handleClose()
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
                        gap={5}
                    >
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
                                        ref={popupMenuRef}
                                    />
                                </Box>
                            </Box>
                            <span>
                                A tournament must include a stream in at least one of the following
                                languages:
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
                                        onDelete={() => handleLanguageChipDeletion(language)}
                                    />
                                ))}
                            </Box>
                        </Stack>
                        <Stack
                            direction="column"
                            gap={1}
                        >
                            <Stack
                                direction="row"
                                gap={1}
                            >
                                <Typography variant="h6">Viewership min. threshold:</Typography>
                                <TextField
                                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                />
                            </Stack>
                            <span>
                                A live tournament&apos;s viewership from all of its streams must
                                exceed this number for it to be shown.
                            </span>
                        </Stack>
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
    const itemData = { languages, handleLanguageSelection, selectedLanguages }

    return (
        <FixedSizeList
            height={240}
            itemCount={languages.length}
            itemData={itemData}
            itemSize={46}
            overscanCount={5}
            width={250}
        >
            {LanguageListRow}
        </FixedSizeList>
    )
}

const LanguageListRow = ({ data, index, style }: ListChildComponentProps) => {
    const { languages, handleLanguageSelection, selectedLanguages } = data
    const language = languages[index]
    const isDisabled = selectedLanguages.includes(language) ? true : false

    return (
        <ListItem style={style}>
            <ListItemButton
                disabled={isDisabled}
                onClick={() => handleLanguageSelection(language)}
            >
                <ListItemText primary={language} />
            </ListItemButton>
        </ListItem>
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
