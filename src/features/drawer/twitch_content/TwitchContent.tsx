import { Box } from "@mui/material"
import { useState } from "react"
import "../Drawer.css"
import DrawerHeader from "../shared_components/DrawerHeader"
import { getCookie, setCookie, getCookies } from "typescript-cookie"
import FollowedStreams from "./FollowedStreams"
import TwitchSettings from "./TwitchSettings"
import TwitchConnect from "./TwitchConnect"
import axios from "axios"
import { useQuery } from "react-query"
import { FollowedStream } from "./StreamCard"
import PlaceholderSkeleton from "../shared_components/PlaceholderSkeleton"
import { BACKEND_BASE_URL } from "../../../envConfig"

export enum TwitchContentView {
    Settings = "settings",
    FollowedStreams = "followedStreams",
    Connect = "conncect",
}

interface TwitchContentProps {
    handleDrawerClose: () => void
}

const TwitchContent = ({ handleDrawerClose }: TwitchContentProps) => {
    const [twitchContentView, setTwitchContentView] = useState(TwitchContentView.FollowedStreams)

    const handleSettingsView = () => {
        if (twitchContentView === "settings") {
            setTwitchContentView(TwitchContentView.FollowedStreams)
        } else {
            setTwitchContentView(TwitchContentView.Settings)
        }
    }

    const { isLoading, isError, data, error } = useQuery<FollowedStream[]>(
        "followedStreams",
        queryFollowedStreams,
        {
            retry: 1,
            cacheTime: 1000 * 100, // 10 minutes
            staleTime: 1000 * 10 * 2, // 2 minutes
        }
    )

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
                    settingsViewOpen={twitchContentView === TwitchContentView.Settings}
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
                    settingsViewOpen={twitchContentView === TwitchContentView.Settings}
                    handleSettingsView={handleSettingsView}
                />
                {twitchContentView === TwitchContentView.Settings ? (
                    <TwitchSettings />
                ) : (
                    <FollowedStreams followedStreams={data} />
                )}
            </Box>
        )
    }

    return null
}

const queryFollowedStreams = async () => {
    const twitchToken = getCookie("twitch-token")

    if (!twitchToken) {
        throw new Error("Twitch token missing")
    }

    const res = await axios.get(`${BACKEND_BASE_URL}/twitch`, {
        headers: { Authorization: `Bearer ${twitchToken}` },
    })

    if (res.data.newToken) {
        setCookie("twitch-token", res.data.newToken)
    }

    return res.data.streams
}

export default TwitchContent
