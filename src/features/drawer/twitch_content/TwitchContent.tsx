import { Box } from "@mui/material"
import { useState } from "react"
import "../Drawer.css"
import DrawerHeader from "../shared_components/DrawerHeader"
import PlaceholderSkeleton from "../shared_components/PlaceholderSkeleton"
import FollowedStreams from "./FollowedStreams"
import TwitchConnect from "./TwitchConnect"
import TwitchSettings from "./TwitchSettings"
import useFollowedStreamsQuery from "./useFollowedStreamsQuery"

export type TwitchContentView = "settings" | "followedStreams" | "connect"

interface TwitchContentProps {
    handleDrawerClose: () => void
}

const TwitchContent = ({ handleDrawerClose }: TwitchContentProps) => {
    const [twitchContentView, setTwitchContentView] = useState<TwitchContentView>("followedStreams")

    const { data, error, isError, isLoading } = useFollowedStreamsQuery()

    const handleSettingsView = () => {
        if (twitchContentView === "settings") {
            setTwitchContentView("followedStreams")
        } else {
            setTwitchContentView("settings")
        }
    }

    if (isLoading) {
        return (
            <Box
                className="drawer"
                paddingTop={5}
            >
                <PlaceholderSkeleton
                    count={3}
                    gap={5}
                    height={250}
                    width={350}
                />
            </Box>
        )
    }

    if (isError) {
        return (
            <Box className="drawer">
                <DrawerHeader
                    handleDrawerClose={handleDrawerClose}
                    handleSettingsView={handleSettingsView}
                    settingsViewOpen={twitchContentView === "settings"}
                    title="Twitch streams"
                />
                <TwitchConnect />
            </Box>
        )
    }

    if (data) {
        return (
            <Box className="drawer">
                <DrawerHeader
                    handleDrawerClose={handleDrawerClose}
                    handleSettingsView={handleSettingsView}
                    settingsViewOpen={twitchContentView === "settings"}
                    title="Twitch streams"
                />
                {twitchContentView === "settings" ? (
                    <TwitchSettings />
                ) : (
                    <FollowedStreams followedStreams={data} />
                )}
            </Box>
        )
    }

    return null
}

export default TwitchContent
