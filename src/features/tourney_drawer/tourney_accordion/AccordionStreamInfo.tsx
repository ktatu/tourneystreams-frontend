import { Box, Link, Tooltip, Typography, Switch } from "@mui/material"
import { useState, useEffect } from "react"
import useQueryParams from "../../../hooks/useQueryParams"
import { StreamInfo } from "../types"

const AccordionStreamInfo = ({ streamInfo }: { streamInfo: StreamInfo }) => {
    const [streamToggled, setStreamToggled] = useState(false)
    const channels = useQueryParams("channel")
    const { channel, channelLink } = streamInfo

    const handleStreamToggle = (previousToggleValue: boolean) => {
        if (previousToggleValue) {
            channels.removeValue(channel)
        } else {
            channels.addValue(channel)
        }
    }

    useEffect(() => {
        if (channels.getValuesAsArray().includes(channel)) {
            setStreamToggled(true)
        } else {
            setStreamToggled(false)
        }
    }, [channels])

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={1}
            padding={0}
            margin={0}
        >
            <Tooltip title="Finnish">
                <span
                    id="country-flag"
                    className="fi fi-fi"
                />
            </Tooltip>
            <Typography>
                <Link
                    href={channelLink}
                    rel="noreferrer"
                    target="_blank"
                >
                    {channel}
                </Link>
            </Typography>
            <span style={{ color: "#F75750" }}>(1000)</span>
            <Switch
                checked={streamToggled}
                onChange={() => handleStreamToggle(streamToggled)}
                size="small"
            />
        </Box>
    )
}

export default AccordionStreamInfo

/*
                <a
                    style={{ textDecoration: "none", color: "#347deb" }}
                    href={channelLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    {channel}
                </a>
*/
