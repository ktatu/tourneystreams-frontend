import {
    Box,
    Link,
    Tooltip,
    Typography,
    Switch,
    Stack,
    List,
    ListItem,
    ListItemText,
    Button,
    ListItemIcon,
    ListSubheader,
} from "@mui/material"
import { memo, useState } from "react"
import { StreamInfo } from "../types"

import WifiIcon from "@mui/icons-material/Wifi"
import BluetoothIcon from "@mui/icons-material/Bluetooth"

/*
jos Box joka sisältää listan on display="flex", ja
jos Listiin on asetettu dense tai Listiin tai ListItemiin on asetettu disablePadding
==> väännetään vipua, niin alapuolella olevat listan jäsenet välkkyvät
*/

interface StreamInfoListProps {
    streamInfoArray: StreamInfo[]
}

const StreamInfoList = ({ streamInfoArray }: StreamInfoListProps) => {
    /*
    const [toggledStreams, setToggledStreams] = useState<Array<string>>([])

    const handleStreamToggle = (toggledStream: string) => {
        if (toggledStreams.includes(toggledStream)) {
            setToggledStreams(toggledStreams.filter((stream) => stream !== toggledStream))
        } else {
            setToggledStreams(toggledStreams.concat(toggledStream))
        }
    }*/

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

// Copy of StreamInfoRow but wrapped in a React.memo
// const StreamInfoRowMemo = React.memo(StreamInfoRow)
const StreamInfoRow = memo(function StreamInfoRow({ streamInfo }: StreamInfoRowProps) {
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
                    <Typography
                        alignItems="center"
                        variant="h6"
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
                            {streamInfo.channel}
                        </Link>
                        <Typography color="secondary">(1000)</Typography>
                    </Typography>
                </Box>
            </ListItemText>
            <Box>
                <Switch
                    edge="end"
                    size="small"
                />
            </Box>
        </ListItem>
    )
})

export default StreamInfoList
