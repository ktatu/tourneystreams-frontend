// AI-generated addition by GitHub Copilot (Claude Sonnet 4.5): added a theme-colored pulsing halo animation around the LiveTvIcon.
import { keyframes } from "@emotion/react"
import { PlayCircle } from "@mui/icons-material"
import EditIcon from "@mui/icons-material/Edit"
import LiveTvIcon from "@mui/icons-material/LiveTv"
import { Box, Card, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { alpha } from "@mui/material/styles"
import { useState } from "react"
import theme from "../../../theme"
import { Preset } from "../../../types"
import PresetCardThumbnail from "./PresetCardThumbnail"
import ThumbnailInfoOverlay from "./ThumbnailInfoOverlay"
import { sumViewerCount } from "./hooks/usePresets"

const pulse = keyframes`
    0% {
        box-shadow: 0 0 0 0 ${alpha(theme.palette.secondary.main, 0.6)};
    }
    70% {
        box-shadow: 0 0 0 8px ${alpha(theme.palette.secondary.main, 0)};
    }
    100% {
        box-shadow: 0 0 0 0 ${alpha(theme.palette.secondary.main, 0)};
    }
`

const PresetCard = ({ preset }: { preset: Preset }) => {
    const [presetStreamsArePlaying, setPresetStreamsArePlaying] = useState(false)

    const hideThumbnail = localStorage.getItem("hideStreamThumbnails") === "true"
    const STREAMCARD_WIDTH = 375

    const channelsWithStreamsLive = preset.channels.filter((preset) => preset.stream !== undefined)
    const numOfChannelsLive = channelsWithStreamsLive.length
    const totalViewersInStreams = channelsWithStreamsLive.reduce(sumViewerCount, 0)

    return (
        <Card sx={{ width: STREAMCARD_WIDTH, position: "relative" }}>
            {!hideThumbnail && (
                <PresetCardThumbnail
                    streamName={channelsWithStreamsLive[0].loginName}
                    thumbnailWidth={STREAMCARD_WIDTH}
                    overlay={
                        <ThumbnailInfoOverlay
                            presetName={preset.name}
                            broadcastName={
                                channelsWithStreamsLive[0].stream?.broadcastName as string
                            }
                        />
                    }
                />
            )}
            <Box padding={0.5}>
                <Stack spacing={3}>
                    {hideThumbnail && <Typography variant="h5">{preset.name}</Typography>}
                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Stack
                            alignItems="flex-start"
                            direction="row"
                            spacing={2}
                        >
                            <Tooltip title={`${numOfChannelsLive} channels live`}>
                                <Stack
                                    direction="row"
                                    spacing={0.5}
                                >
                                    <Typography
                                        paddingTop={0.2}
                                        variant="body1"
                                    >
                                        {channelsWithStreamsLive.length}/{preset.channels.length}
                                    </Typography>
                                    <Box
                                        borderRadius="50%"
                                        display="flex"
                                        sx={{ animation: `${pulse} 2s ease-out infinite` }}
                                    >
                                        <LiveTvIcon
                                            color="secondary"
                                            fontSize="medium"
                                        />
                                    </Box>
                                </Stack>
                            </Tooltip>
                            <Typography
                                paddingTop={0.2}
                                variant="body1"
                            >
                                {totalViewersInStreams} viewers
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Tooltip title="Edit preset">
                                <IconButton
                                    color="primary"
                                    size="large"
                                >
                                    <EditIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Play all streams">
                                <IconButton
                                    color="primary"
                                    size="large"
                                >
                                    <PlayCircle fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Card>
    )
}

export default PresetCard
