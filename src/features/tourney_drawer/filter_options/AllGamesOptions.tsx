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
} from "@mui/material"
import PopupMenu, { PopupMenuClose } from "../../../shared_components/PopupMenu"
import ISO from "iso-639-1"
import { FixedSizeList, ListChildComponentProps } from "react-window"
import { useState, useEffect, useRef } from "react"
import InfoIcon from "@mui/icons-material/Info"

const AllGames = () => {
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

    const handleLanguageChipDeletion = (languageToDelete: string) => {
        setLanguages(languages.filter((language) => language !== languageToDelete))
    }

    const handleLanguageSelection = (language: string) => {
        setLanguages(languages.concat(language))
        popupMenuRef.current?.handleClose()
    }

    return (
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
                    <Box
                        display="flex"
                        flexDirection="row"
                    >
                        <Typography variant="h6">Languages</Typography>
                        <Tooltip
                            color="info"
                            placement="right-end"
                            title="A tournament must include a stream in at least one of the selected languages"
                        >
                            <InfoIcon fontSize="small" />
                        </Tooltip>
                    </Box>
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
                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    gap={1}
                >
                    {languages.map((language) => (
                        <Chip
                            color="primary"
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
                    <Box
                        display="flex"
                        flexDirection="row"
                    >
                        <Typography variant="h6">Minimum viewership</Typography>
                        <Tooltip
                            color="info"
                            placement="right-end"
                            title="A live tournament's viewership from all of its streams must exceed this number for it to be shown"
                        >
                            <InfoIcon fontSize="small" />
                        </Tooltip>
                    </Box>
                    <TextField
                        sx={{ width: "125px" }}
                        label="Enter a number"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    />
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
