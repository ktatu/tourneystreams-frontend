import { Skeleton, Typography } from "@mui/material"
import { StreamSource } from "../../types"
import useYoutubeChannelQuery from "./useYoutubeChannelQuery"

interface StreamNameProps {
    streamId: string
    streamSource: StreamSource
}

const StreamName = ({ streamId, streamSource }: StreamNameProps) => {
    const { data: channelName, isLoading } = useYoutubeChannelQuery(streamId, streamSource)

    if (isLoading) {
        return (
            <Skeleton
                variant="text"
                sx={{ width: "100%" }}
            />
        )
    }

    if (channelName) {
        return <NameText streamName={channelName} />
    }

    return <NameText streamName={streamId} />
}

const NameText = ({ streamName }: { streamName: string }) => {
    return (
        <Typography
            sx={{ userSelect: "none" }}
            variant="button"
        >
            {streamName}
        </Typography>
    )
}

export default StreamName
