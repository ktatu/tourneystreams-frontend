import { Box, Button, Typography } from "@mui/material"
import LaunchIcon from "@mui/icons-material/Launch"
import { useState } from "react"
import "../Drawer.css"
import StreamCardsContainer from "./StreamCardsContainer"
import DrawerHeader from "../shared_components/DrawerHeader"
import { getCookie } from "typescript-cookie"
import SortBySelect from "./SortBySelect"
import FilterByField from "./FilterByField"

export enum FilterBy {
    Category = "category",
    ChannelName = "channel name",
    Title = "title",
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
                        >
                            <SortBySelect
                                sortValue={sortValue}
                                setSortValue={setSortValue}
                            />
                            <FilterByField
                                filterValue={filterValue}
                                setFilterValue={setFilterValue}
                                filterType={filterType}
                                setFilterType={setFilterType}
                            />
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
