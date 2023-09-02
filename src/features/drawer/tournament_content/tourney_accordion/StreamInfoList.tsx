import { Box, Link, List, ListItem, ListItemText, Switch, Typography } from "@mui/material"
import { memo, useEffect, useState } from "react"
import { addStream, removeStream, useStreamsState } from "../../../../commons/streamsState"
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
    const { channels } = useStreamsState()

    const handleToggle = () => {
        if (checked) {
            removeStream(streamInfo.channel)
        } else {
            addStream(streamInfo.channel)
        }
        setChecked(!checked)
    }

    useEffect(() => {
        setChecked(channels.includes(streamInfo.channel))
    }, [channels])

    return (
        <ListItem key={streamInfo.channel}>
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
                            sx={{ textDecoration: "none", color: "#347deb" }}
                            target="_blank"
                        >
                            <Typography variant="h6">{streamInfo.channel}</Typography>
                        </Link>
                        <Typography
                            color="secondary"
                            variant="h6"
                        >
                            (1000)
                        </Typography>
                    </Box>
                </Box>
            </ListItemText>
            <Box>
                <Switch
                    checked={checked}
                    edge="end"
                    size="small"
                    onChange={handleToggle}
                />
            </Box>
        </ListItem>
    )
})

export default StreamInfoList
