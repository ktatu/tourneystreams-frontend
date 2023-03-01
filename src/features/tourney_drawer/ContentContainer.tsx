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
import TourneyAccordion from "./TourneyAccordion"
import ISO from "iso-639-1"

import SettingsIcon from "@mui/icons-material/Settings"

interface ContentContainerProps {
    filterOptionsViewOpen: boolean
    tourneyInfoArray: Array<TourneyInfo>
}

const ContentContainer = ({ filterOptionsViewOpen, tourneyInfoArray }: ContentContainerProps) => {
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
                                alignItems="center"
                            >
                                <Typography variant="h6">Minimum viewership:</Typography>
                                <TextField
                                    sx={{ width: "125px" }}
                                    label="Enter a number"
                                    InputLabelProps={{ shrink: true }}
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

export default ContentContainer
