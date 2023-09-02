import { Box } from "@mui/material"
import { useState } from "react"
import DrawerHeader from "../shared_components/DrawerHeader"
import FollowedStreams from "./FollowedStreams"
import TwitchSettings from "./TwitchSettings"
import TwitchConnect from "./TwitchConnect"
import PlaceholderSkeleton from "../shared_components/PlaceholderSkeleton"
import useFollowedStreamsQuery from "./useFollowedStreamsQuery"
import "../Drawer.css"

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
                    width={350}
                    height={250}
                    gap={5}
                />
            </Box>
        )
    }

    if (isError) {
        return (
            <Box className="drawer">
                <DrawerHeader
                    title="Twitch streams"
                    handleDrawerClose={handleDrawerClose}
                    settingsViewOpen={twitchContentView === "settings"}
                    handleSettingsView={handleSettingsView}
                />
                <TwitchConnect />
            </Box>
        )
    }

    if (data) {
        return (
            <Box className="drawer">
                <DrawerHeader
                    title="Twitch streams"
                    handleDrawerClose={handleDrawerClose}
                    settingsViewOpen={twitchContentView === "settings"}
                    handleSettingsView={handleSettingsView}
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
