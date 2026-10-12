import "../Drawer.css"
import DrawerCardSkeleton from "../shared_components/DrawerCardSkeleton"
import DrawerContainer from "../shared_components/DrawerContainer"
import DrawerHeader from "../shared_components/DrawerHeader"
import TwitchConnectError from "../shared_components/TwitchConnectError"
import FollowedStreamsList from "./FollowedStreamsList"
import useFollowedStreamsQuery from "./hooks/useFollowedStreamsQuery"

interface FollowedStreamsProps {
    handleDrawerClose: () => void
}

const FollowedStreams = ({ handleDrawerClose }: FollowedStreamsProps) => {
    const { data: streams, isError, isLoading, error } = useFollowedStreamsQuery()

    return (
        <DrawerContainer>
            <>
                <DrawerHeader
                    handleDrawerClose={handleDrawerClose}
                    title="Followed on Twitch"
                />
                {isLoading && (
                    <DrawerCardSkeleton
                        count={2}
                        gap={5}
                    />
                )}
                {isError && <TwitchConnectError error={error} />}
                {streams && <FollowedStreamsList followedStreams={streams} />}
            </>
        </DrawerContainer>
    )
}

export default FollowedStreams
