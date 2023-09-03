import { useState } from "react"
import "../Drawer.css"
import DrawerContainer from "../shared_components/DrawerContainer"
import DrawerHeader from "../shared_components/DrawerHeader"
import PlaceholderSkeleton from "../shared_components/PlaceholderSkeleton"
import FollowedStreams from "./FollowedStreams"
import TwitchErrorDisplay from "./TwitchErrorDisplay"
import TwitchSettings from "./TwitchSettings"
import useFollowedStreamsQuery from "./hooks/useFollowedStreamsQuery"

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

    return (
        <DrawerContainer>
            <>
                <DrawerHeader
                    handleDrawerClose={handleDrawerClose}
                    handleSettingsView={handleSettingsView}
                    settingsViewOpen={twitchContentView === "settings"}
                    showSettingsIcon={Boolean(data)}
                    title="Twitch streams"
                />
                {isLoading && (
                    <PlaceholderSkeleton
                        count={3}
                        gap={5}
                        height={250}
                        width={350}
                    />
                )}
                {isError && <TwitchErrorDisplay error={error} />}
                {data && (
                    <>
                        {twitchContentView === "settings" ? (
                            <TwitchSettings />
                        ) : (
                            <FollowedStreams followedStreams={data} />
                        )}
                    </>
                )}
            </>
        </DrawerContainer>
    )
}

export default TwitchContent
