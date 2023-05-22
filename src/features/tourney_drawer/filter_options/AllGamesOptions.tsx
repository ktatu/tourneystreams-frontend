import {
    Stack,
    Box,
    Typography,
    Chip,
    TextField,
    ListItem,
    ListItemButton,
    ListItemText,
    Tooltip,
    Button,
} from "@mui/material"
import PopupMenu, { PopupMenuClose } from "../../../commons/PopupMenu"
import ISO from "iso-639-1"
import { FixedSizeList, ListChildComponentProps } from "react-window"
import { useState, useEffect, useRef, ChangeEvent } from "react"
import InfoIcon from "@mui/icons-material/Info"
import { FilterOptionHeader } from "./FilterOptions"
import useFilterOptions from "./useFilterOptions"

const ALLGAMES_LANGUAGES_DEFAULTS = ["English"]
const MIN_VIEWERSHIP_DEFAULT = 100

const AllGames = () => {
    const languages = useFilterOptions("allgamesLanguages", ALLGAMES_LANGUAGES_DEFAULTS)
    const [minViewership, setMinViewership] = useState<string>("")

    const popupMenuRef = useRef<PopupMenuClose>(null)

    useEffect(() => {
        const savedViewershipValue = localStorage.getItem("allgamesMinViewership")

        if (savedViewershipValue) {
            setMinViewership(savedViewershipValue)
        } else {
            setMinViewership(MIN_VIEWERSHIP_DEFAULT.toString())
        }
    }, [])

    const handleLanguageSelection = (language: string) => {
        languages.handleChange(language)
        popupMenuRef.current?.handleClose()
    }

    const handleMinViewershipSubmit = () => {
        const newMinValue = parseInt(minViewership)

        if (newMinValue) {
            localStorage.setItem("allgamesMinViewership", JSON.stringify(newMinValue))
        } else {
            localStorage.setItem("allgamesMinViewership", JSON.stringify(MIN_VIEWERSHIP_DEFAULT))
            setMinViewership(MIN_VIEWERSHIP_DEFAULT.toString())
        }
    }

    return (
        <Stack
            direction="column"
            gap={8}
        >
            <Stack
                direction="column"
                gap={2}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    gap={2}
                >
                    <Box
                        display="flex"
                        flexDirection="row"
                    >
                        <FilterOptionHeader
                            optionTitle="Languages"
                            tooltipText="A tournament must include a stream in at least one of the selected languages"
                        />
                    </Box>
                    <Box>
                        <PopupMenu
                            buttonProps={{
                                buttonText: "Add More",
                            }}
                            ref={popupMenuRef}
                        >
                            <LanguageSelectionMenuContent
                                handleLanguageSelection={handleLanguageSelection}
                                selectedLanguages={languages.getAll()}
                            />
                        </PopupMenu>
                    </Box>
                </Box>
                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    gap={1}
                >
                    {languages
                        .getAll()
                        .sort((languageA, languageB) => (languageA < languageB ? -1 : 1))
                        .map((language) => (
                            <Chip
                                color="primary"
                                key={language}
                                label={language}
                                onDelete={() => languages.handleChange(language)}
                            />
                        ))}
                </Box>
            </Stack>
            <Stack
                direction="column"
                gap={2}
            >
                <Stack
                    direction="row"
                    gap={1}
                    alignItems="center"
                >
                    <Box
                        display="flex"
                        flexDirection="row"
                    >
                        <FilterOptionHeader
                            optionTitle="Minimum viewership"
                            tooltipText="A live tournament's viewership from all of its streams must exceed this number for it to be shown"
                        />
                    </Box>
                </Stack>
                <Stack
                    direction="row"
                    gap={1}
                >
                    <TextField
                        sx={{ width: "125px" }}
                        label="Enter a number"
                        InputLabelProps={{ shrink: true }}
                        type="number"
                        value={minViewership}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        onChange={(event) => setMinViewership(event.target.value.toString())}
                    />
                    <Button
                        onClick={handleMinViewershipSubmit}
                        variant="contained"
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>
        </Stack>
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

export default AllGames
