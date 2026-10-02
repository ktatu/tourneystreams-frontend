import "../Drawer.css"
import DrawerContainer from "../shared_components/DrawerContainer"
import DrawerHeader from "../shared_components/DrawerHeader"
import PlaceholderSkeleton from "../shared_components/PlaceholderSkeleton"
import TwitchConnect from "../shared_components/TwitchConnect"
import FollowedStreamsList from "./FollowedStreamsList"
import useFollowedStreamsQuery from "./hooks/useFollowedStreamsQuery"

interface FollowedStreamsProps {
    handleDrawerClose: () => void
}

const FollowedStreams = ({ handleDrawerClose }: FollowedStreamsProps) => {
    const { data: streams, isError, isLoading } = useFollowedStreamsQuery()

    return (
        <DrawerContainer>
            <>
                <DrawerHeader
                    handleDrawerClose={handleDrawerClose}
                    title="Twitch streams"
                />
                {isLoading && (
                    <PlaceholderSkeleton
                        count={2}
                        gap={5}
                        height={250}
                        width={350}
                    />
                )}
                {isError && (
                    <TwitchConnect message="Connect your Twitch account to see your followed channels" />
                )}
                {streams && <FollowedStreamsList followedStreams={streams} />}
            </>
        </DrawerContainer>
    )
}

export default FollowedStreams
