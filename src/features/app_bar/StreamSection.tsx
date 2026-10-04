// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): changed the SVG import to the ?react form, moved MUI system props into sx, as part of the Vite/dependency migration.
import {
    Box,
    Button,
    SvgIcon,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material"
import { useState } from "react"
import TwitchLogo from "../../assets/TwitchLogo.svg?react"
import YouTubeLogo from "../../assets/YouTubeLogo.png"
import { addAlert } from "../../commons/alertState"
import { addStream } from "../../commons/streamsState"
import { StreamSource } from "../../types"
import StreamList from "./StreamList"

const StreamSection = () => {
    const [addStreamFieldValue, setAddStreamFieldValue] = useState("")
    const [streamSource, setStreamSource] = useState<StreamSource>(StreamSource.TWITCH)

    const handleAddTwitchStream = () => {
        if (!addStreamFieldValue) {
            return
        }

        addStream(addStreamFieldValue, streamSource)
        setAddStreamFieldValue("")
    }

    const handleAddYoutubeStream = () => {
        if (!addStreamFieldValue) {
            return
        }

        const youtubeId = parseYoutubeIdFromUrl(addStreamFieldValue)
        if (typeof youtubeId !== "string") {
            setAddStreamFieldValue("")
            addAlert("Invalid YouTube url", "error")
            return
        }

        addStream(youtubeId, streamSource)
        setAddStreamFieldValue("")
    }

    const handleStreamField = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddStreamFieldValue(event.target.value)
    }

    const handleStreamSourceChange = (
        _event: React.MouseEvent<HTMLElement>,
        newStreamSource: StreamSource,
    ) => {
        if (newStreamSource !== null) {
            setStreamSource(newStreamSource)
        }
    }

    const getPlaceHolderText = () => {
        if (streamSource === StreamSource.TWITCH) {
            return "Channel name"
        }
        return "Stream url"
    }

    const getLabelText = () => {
        if (streamSource === StreamSource.TWITCH) {
            return "Add Twitch stream"
        }
        return "Add YouTube stream"
    }

    return (
        <Box
            sx={{
                alignItems: "center",
                display: "flex",
                gap: 1
            }}>
            <Box
                sx={{
                    alignItems: "stretch",
                    display: "flex",
                    gap: 0
                }}>
                <ToggleButtonGroup
                    exclusive
                    value={streamSource}
                    onChange={handleStreamSourceChange}
                >
                    <ToggleButton value={StreamSource.TWITCH}>
                        <SvgIcon>
                            <TwitchLogo />
                        </SvgIcon>
                    </ToggleButton>
                    <ToggleButton value={StreamSource.YOUTUBE}>
                        <img
                            src={YouTubeLogo}
                            width="30px"
                        />
                    </ToggleButton>
                </ToggleButtonGroup>
                <TextField
                    id="add-stream-field"
                    label={getLabelText()}
                    placeholder={getPlaceHolderText()}
                    value={addStreamFieldValue}
                    variant="outlined"
                    onChange={handleStreamField}
                />
            </Box>
            <Button
                color="primary"
                variant="contained"
                onClick={
                    streamSource === StreamSource.TWITCH
                        ? handleAddTwitchStream
                        : handleAddYoutubeStream
                }
            >
                <Typography variant="h4">+</Typography>
            </Button>
            <Box sx={{
                marginLeft: 10
            }}>
                <StreamList />
            </Box>
        </Box>
    )
}

const parseYoutubeIdFromUrl = (url: string) => {
    const parsedUrl = URL.parse(url)
    const id = parsedUrl?.searchParams.get("v")
    return id
}

export default StreamSection
