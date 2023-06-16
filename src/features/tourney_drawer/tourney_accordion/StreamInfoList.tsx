import { Box, Link, Tooltip, Typography, Switch, List, ListItem, ListItemText } from "@mui/material"
import { memo, useEffect, useState } from "react"
import { useStreamContext } from "../../../commons/streamReducer"
import { StreamInfo } from "../types"

/*
jos Box joka sisältää listan on display="flex", ja
jos Listiin on asetettu dense tai Listiin tai ListItemiin on asetettu disablePadding
==> väännetään vipua, niin alapuolella olevat listan jäsenet välkkyvät
*/

interface StreamInfoListProps {
    streamInfoArray: StreamInfo[]
}

const StreamInfoList = ({ streamInfoArray }: StreamInfoListProps) => {
    return (
        <Box>
            <List dense>
                {streamInfoArray.map((stream) => (
                    <StreamInfoRow
                        key={stream.channel}
                        streamInfo={stream}
                    />
                ))}
            </List>
        </Box>
    )
}

interface StreamInfoRowProps {
    streamInfo: StreamInfo
}

const StreamInfoRow = memo(function StreamInfoRow({ streamInfo }: StreamInfoRowProps) {
    const [checked, setChecked] = useState(false)
    const { streamState, addStream, removeStream } = useStreamContext()

    const handleToggle = () => {
        if (checked) {
            removeStream(streamInfo.channel)
        } else {
            addStream(streamInfo.channel)
        }
        setChecked(!checked)
    }

    useEffect(() => {
        setChecked(
            streamState.streams.map((stream) => stream.channelName).includes(streamInfo.channel)
        )
    }, [streamState.streams])

    return (
        <ListItem key={streamInfo.channel}>
            <Box paddingRight={1}>
                <Tooltip title="Finnish">
                    <span
                        id="country-flag"
                        className="fi fi-fi"
                    />
                </Tooltip>
            </Box>
            <ListItemText>
                <Box
                    display="flex"
                    flexDirection="row"
                    gap={1}
                >
                    <Box
                        alignItems="center"
                        display="flex"
                        flexDirection="row"
                        gap={1}
                    >
                        <Link
                            href={streamInfo.channelLink}
                            rel="noreferrer"
                            target="_blank"
                            sx={{ textDecoration: "none", color: "#347deb" }}
                        >
                            <Typography variant="h6">{streamInfo.channel}</Typography>
                        </Link>
                        <Typography
                            variant="h6"
                            color="secondary"
                        >
                            (1000)
                        </Typography>
                    </Box>
                </Box>
            </ListItemText>
            <Box>
                <Switch
                    checked={checked}
                    onChange={handleToggle}
                    edge="end"
                    size="small"
                />
            </Box>
        </ListItem>
    )
})

export default StreamInfoList
