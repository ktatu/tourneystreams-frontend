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

const StreamInfoList = ({ streamInfoArray }: { streamInfoArray: StreamInfo[] }) => {
    /*
    const [toggledStreams, setToggledStreams] = useState<Array<string>>([])

    const handleStreamToggle = (toggledStream: string) => {
        if (toggledStreams.includes(toggledStream)) {
            setToggledStreams(toggledStreams.filter((stream) => stream !== toggledStream))
        } else {
            setToggledStreams(toggledStreams.concat(toggledStream))
        }
    }*/

    console.log("stream info list")

    return (
        <Box>
            <List dense>
                {streamInfoArray.map((stream) => (
                    <StreamInfoRow2
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

const StreamInfoRow = ({ streamInfo }: StreamInfoRowProps) => {
    console.log("no memo render ", streamInfo.channel)
    return (
        <ListItem
            sx={{ padding: "1px" }}
            key={streamInfo.channel}
        >
            <Box paddingRight={2}>
                <Tooltip title="Finnish">
                    <span
                        id="country-flag"
                        className="fi fi-fi"
                    />
                </Tooltip>
            </Box>
            <ListItemText>{streamInfo.channel}</ListItemText>
            <Switch
                edge="end"
                size="small"
            />
        </ListItem>
    )
}

// Copy of StreamInfoRow but wrapped in a React.memo
// const StreamInfoRowMemo = React.memo(StreamInfoRow)
const StreamInfoRow2 = memo(function StreamInfoRow2({ streamInfo }: StreamInfoRowProps) {
    console.log("memo render ", streamInfo.channel)
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

const SwitchListSecondary = () => {
    const [checked, setChecked] = useState(["wifi"])

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            subheader={<ListSubheader>Settings</ListSubheader>}
        >
            <ListItem>
                <ListItemIcon>
                    <WifiIcon />
                </ListItemIcon>
                <ListItemText
                    id="switch-list-label-wifi"
                    primary="Wi-Fi"
                />
                <Switch
                    edge="end"
                    onChange={handleToggle("wifi")}
                    checked={checked.indexOf("wifi") !== -1}
                    inputProps={{
                        "aria-labelledby": "switch-list-label-wifi",
                    }}
                />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <BluetoothIcon />
                </ListItemIcon>
                <ListItemText
                    id="switch-list-label-bluetooth"
                    primary="Bluetooth"
                />
                <Switch
                    edge="end"
                    onChange={handleToggle("bluetooth")}
                    checked={checked.indexOf("bluetooth") !== -1}
                    inputProps={{
                        "aria-labelledby": "switch-list-label-bluetooth",
                    }}
                />
            </ListItem>
        </List>
    )
}

export default StreamInfoList
