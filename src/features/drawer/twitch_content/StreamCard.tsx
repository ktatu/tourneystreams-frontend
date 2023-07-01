import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Collapse,
    IconButton,
    IconButtonProps,
    Switch,
    Typography,
    styled,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useEffect, useState } from "react"
import round from "lodash.round"
import { useStreamContext } from "../../../commons/streamReducer"

export interface FollowedStream {
    game: string
    title: string
    loginName: string
    broadcastName: string
    viewerCount: number
}

interface StreamCardProps {
    followedStream: FollowedStream
}

const StreamCard = ({ followedStream }: StreamCardProps) => {
    const [cardExpanded, setCardExpanded] = useState(false)
    const [streamToggled, setStreamToggled] = useState(false)

    const { streamState, addStream, removeStream } = useStreamContext()

    const thumbnailUrl = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${followedStream.loginName}-350x210.jpg`

    const handleCardExpand = () => {
        setCardExpanded(!cardExpanded)
    }

    const handleStreamToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            addStream(followedStream.loginName)
        } else {
            removeStream(followedStream.loginName)
        }
        setStreamToggled(event.target.checked)
    }

    useEffect(() => {
        setStreamToggled(
            streamState.streams
                .map((stream) => stream.channelName)
                .includes(followedStream.loginName)
        )
    }, [streamState.streams])

    return (
        <Card sx={{ width: 350, position: "relative" }}>
            <CardMedia
                image={thumbnailUrl}
                sx={{ width: 350, height: 210 }}
            />
            <Box
                position="absolute"
                top={0}
                left={0}
                bgcolor="rgba(0, 0, 0, 0.4)"
                padding={0.5}
            >
                <div style={{ opacity: 1, userSelect: "none" }}>{followedStream.game}</div>
            </Box>
            <Box
                position="absolute"
                top={180}
                left={0}
                bgcolor="rgba(0, 0, 0, 0.4)"
                padding={0.5}
            >
                <div style={{ opacity: 1, userSelect: "none" }}>
                    {parseViewerCount(followedStream.viewerCount)}
                </div>
            </Box>
            <CardContent>
                <Box
                    display="flex"
                    gap={1}
                    alignItems="center"
                    alignContent="center"
                >
                    <Typography variant="h5">{followedStream.broadcastName}</Typography>
                    <Switch
                        checked={streamToggled}
                        onChange={handleStreamToggle}
                    />
                    <ExpandMore
                        expand={cardExpanded}
                        onClick={handleCardExpand}
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </Box>
                <Collapse
                    in={cardExpanded}
                    timeout="auto"
                    unmountOnExit
                >
                    {followedStream.title}
                </Collapse>
            </CardContent>
        </Card>
    )
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}))

const parseViewerCount = (viewerCount: number) => {
    if (viewerCount < 1000) {
        return viewerCount + " viewers"
    }
    return round(viewerCount / 1000, 1) + "K viewers"
}

export default StreamCard
