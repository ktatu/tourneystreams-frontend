import {
    Box,
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    MenuList,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material"
import LaunchIcon from "@mui/icons-material/Launch"
import { startTransition, useRef, useState } from "react"
import "../Drawer.css"
import StreamCardsContainer from "./StreamCardsContainer"
import DrawerHeader from "../shared_components/DrawerHeader"
import CloseIcon from "@mui/icons-material/Close"
import { getCookie } from "typescript-cookie"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import PopupMenu, { PopupMenuClose } from "../../../commons/PopupMenu"

export enum FilterBy {
    Category = "category",
    ChannelName = "channel name",
}

// enum values must match keys in FollowedStream for sorting function to work
export enum SortBy {
    ViewerCount = "viewerCount",
    Category = "category",
}

interface TwitchContentProps {
    handleDrawerClose: () => void
}
const TwitchContent = ({ handleDrawerClose }: TwitchContentProps) => {
    const [filterValue, setFilterValue] = useState("")
    const [filterType, setFilterType] = useState(FilterBy.ChannelName)
    const [sortValue, setSortValue] = useState(SortBy.ViewerCount)

    const userHasTwitchToken = getCookie("twitch-token")

    const handleSortByChange = (event: SelectChangeEvent) => {
        switch (event.target.value) {
            case "viewer count":
                setSortValue(SortBy.ViewerCount)
                break
            case "category":
                setSortValue(SortBy.Category)
                break
            default:
                setSortValue(SortBy.ViewerCount)
        }
    }

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setFilterValue(event.target.value)
        })
    }

    const handleFilterTypeChange = (newFilterType: FilterBy) => {
        setFilterType(newFilterType)
        if (popupMenuRef.current) {
            popupMenuRef.current.handleClose()
        }
    }

    const popupMenuRef = useRef<PopupMenuClose | null>(null)

    return (
        <Box className="drawer">
            <DrawerHeader
                title="Twitch streams"
                handleDrawerClose={handleDrawerClose}
            >
                <>
                    {userHasTwitchToken ? (
                        <Box
                            display="flex"
                            gap={3}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <FormControl sx={{ minWidth: "100px" }}>
                                <InputLabel>Sort by</InputLabel>
                                <Select
                                    label="Sort by"
                                    onChange={handleSortByChange}
                                    value={sortValue}
                                >
                                    <MenuItem value={SortBy.Category}>category</MenuItem>
                                    <MenuItem value={SortBy.ViewerCount}>viewer count</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label={`Filter by: ${filterType}`}
                                InputLabelProps={{ shrink: true }}
                                onChange={handleFilterChange}
                                value={filterValue}
                                InputProps={{
                                    endAdornment: (
                                        <PopupMenu
                                            buttonProps={{ buttonIcon: <ArrowDropDownIcon /> }}
                                            ref={popupMenuRef}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() =>
                                                        handleFilterTypeChange(FilterBy.Category)
                                                    }
                                                    selected={filterType === FilterBy.Category}
                                                >
                                                    category
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() =>
                                                        handleFilterTypeChange(FilterBy.ChannelName)
                                                    }
                                                    selected={filterType === FilterBy.ChannelName}
                                                >
                                                    channel name
                                                </MenuItem>
                                            </MenuList>
                                        </PopupMenu>
                                    ),
                                }}
                            ></TextField>
                        </Box>
                    ) : (
                        <Box
                            paddingTop={3}
                            display="flex"
                            flexDirection="column"
                            gap={2}
                        >
                            <Typography variant="body1">
                                Connect your Twitch account to see your followed channels
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                gap={5}
                            >
                                <Button
                                    href={`http://localhost:3001/api/twitch/auth${window.location.search}`}
                                    variant="outlined"
                                    endIcon={<LaunchIcon />}
                                >
                                    Connect
                                </Button>
                            </Box>
                        </Box>
                    )}
                </>
            </DrawerHeader>
            {userHasTwitchToken ? (
                <StreamCardsContainer
                    filterValue={filterValue}
                    filterType={filterType}
                    sortValue={sortValue}
                />
            ) : null}
        </Box>
    )
}

export default TwitchContent
