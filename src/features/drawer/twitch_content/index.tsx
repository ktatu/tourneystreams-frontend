import {
    Box,
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from "@mui/material"
import LaunchIcon from "@mui/icons-material/Launch"
import { startTransition, useState } from "react"
import "../Drawer.css"
import StreamCardsContainer from "./StreamCardsContainer"
import DrawerHeader from "../shared_components/DrawerHeader"
import CloseIcon from "@mui/icons-material/Close"
import { getCookie } from "typescript-cookie"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

enum FilterType {
    Category = "category",
    ChannelName = "channel name",
}

interface TwitchContentProps {
    handleDrawerClose: () => void
}
const TwitchContent = ({ handleDrawerClose }: TwitchContentProps) => {
    const [filter, setFilter] = useState("")
    const [filterType, setFilterType] = useState(FilterType.ChannelName)

    const userHasTwitchToken = getCookie("twitch-token")

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setFilter(event.target.value)
        })
    }

    /*
                            <Input
                                disabled={false}
                                placeholder="Channel"
                                onChange={handleFilterChange}
                                value={filter}
                                endAdornment={
                                    <IconButton
                                        onClick={() => setFilter("")}
                                        sx={{
                                            visibility: filter ? "visible" : "hidden",
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                }
                            />




                            <FormControl variant="outlined">
                                <InputLabel>{`Filter by: ${filterType}`}</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton edge="end">
                                                <ArrowDropDownIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>


    */

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
                                <Select label="Sort by">
                                    <MenuItem value={10}>Viewer count</MenuItem>
                                    <MenuItem value={20}>Category</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Filter by: channel name"
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton edge="end">
                                            <ArrowDropDownIcon />
                                        </IconButton>
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
            {userHasTwitchToken ? <StreamCardsContainer channelFilter={filter} /> : null}
        </Box>
    )
}

export default TwitchContent
