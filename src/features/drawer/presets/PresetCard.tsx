// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
// AI-generated addition by GitHub Copilot (Claude Sonnet 4.5): added a theme-colored pulsing halo animation around the LiveTvIcon.
import { keyframes } from "@emotion/react"
import { Cancel, PlayCircle } from "@mui/icons-material"
import EditIcon from "@mui/icons-material/Edit"
import LiveTvIcon from "@mui/icons-material/LiveTv"
import { Box, Card, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { alpha } from "@mui/material/styles"
import { useState } from "react"
import { addStreamList, removeStreamList } from "../../../commons/streamsState"
import theme from "../../../theme"
import { Preset, StreamSource } from "../../../types"
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

const presetsThatArePlaying: Array<string> = []

interface PresetCardProps {
    handleChangeToPresetUpdate: (preset: Preset) => void
    preset: Preset
}

const PresetCard = ({ preset, handleChangeToPresetUpdate }: PresetCardProps) => {
    const [streamsArePlaying, setStreamsArePlaying] = useState(
        presetsThatArePlaying.includes(preset.name),
    )

    const hideThumbnail = localStorage.getItem("hideStreamThumbnails") === "true"
    const STREAMCARD_WIDTH = 375

    const channelsWithStreamsLive = preset.channels.filter((preset) => preset.stream !== undefined)
    const numOfChannelsLive = channelsWithStreamsLive.length
    const totalViewersInStreams = channelsWithStreamsLive.reduce(sumViewerCount, 0)

    const handlePlayStreams = () => {
        setStreamsArePlaying(true)
        presetsThatArePlaying.push(preset.name)

        const streamsToPlay = preset.channels
            .filter((channel) => channel.stream !== undefined)
            .map((channel) => ({
                id: channel.name,
                streamSource: StreamSource.TWITCH,
            }))

        addStreamList(streamsToPlay)
    }

    const handleCloseStreams = () => {
        const nameIndex = presetsThatArePlaying.findIndex((name) => name === preset.name)
        if (nameIndex !== -1) {
            presetsThatArePlaying.splice(nameIndex, 1)
        }

        removeStreamList(preset.channels.map((channel) => channel.name))
        setStreamsArePlaying(false)
    }

    return (
        <Card sx={{ width: STREAMCARD_WIDTH, position: "relative" }}>
            {!hideThumbnail && (
                <PresetCardThumbnail
                    streamName={channelsWithStreamsLive[0].name}
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
            <Box sx={{
                padding: 0.5
            }}>
                <Stack spacing={3}>
                    {hideThumbnail && <Typography variant="h5">{preset.name}</Typography>}
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                alignItems: "flex-start"
                            }}
                        >
                            <Tooltip title={`${numOfChannelsLive} channels live`}>
                                <Stack
                                    direction="row"
                                    spacing={0.5}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            paddingTop: 0.2
                                        }}
                                    >
                                        {channelsWithStreamsLive.length}/{preset.channels.length}
                                    </Typography>
                                    <Box
                                        sx={{
                                            borderRadius: "50%",
                                            display: "flex",
                                            animation: `${pulse} 2s ease-out infinite`
                                        }}>
                                        <LiveTvIcon
                                            color="secondary"
                                            fontSize="medium"
                                        />
                                    </Box>
                                </Stack>
                            </Tooltip>
                            <Typography
                                variant="body1"
                                sx={{
                                    paddingTop: 0.2
                                }}
                            >
                                {totalViewersInStreams} viewers
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Tooltip title="Edit preset">
                                <IconButton
                                    color="primary"
                                    size="large"
                                    onClick={() => handleChangeToPresetUpdate(preset)}
                                >
                                    <EditIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                            {!streamsArePlaying && (
                                <Tooltip title="Play streams">
                                    <IconButton
                                        color="primary"
                                        size="large"
                                        onClick={() => handlePlayStreams()}
                                    >
                                        <PlayCircle fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {streamsArePlaying && (
                                <Tooltip title="Close streams">
                                    <IconButton onClick={handleCloseStreams}>
                                        <Cancel
                                            color="error"
                                            fontSize="inherit"
                                        />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Card>
    )
}

export default PresetCard
