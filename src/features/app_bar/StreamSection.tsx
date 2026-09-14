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
import { ReactComponent as TwitchLogo } from "../../assets/TwitchLogo.svg"
import YouTubeLogo from "../../assets/YouTubeLogo.png"
import { addStream } from "../../commons/streamsState"
import { StreamSource } from "../../types"
import StreamList from "./StreamList"

const StreamSection = () => {
    const [addStreamFieldValue, setAddStreamFieldValue] = useState("")
    const [streamSource, setStreamSource] = useState<StreamSource>(StreamSource.TWITCH)

    const handleAddStream = () => {
        if (!addStreamFieldValue) {
            return
        }
        addStream({ id: addStreamFieldValue, streamSource })
        setAddStreamFieldValue("")
    }

    const handleStreamField = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddStreamFieldValue(event.target.value)
    }

    const handleStreamSourceChange = (
        event: React.MouseEvent<HTMLElement>,
        newStreamSource: StreamSource,
    ) => {
        setStreamSource(newStreamSource)
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
            alignItems="center"
            display="flex"
            gap={1}
        >
            <Box
                alignItems="stretch"
                display="flex"
                gap={0}
            >
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
                onClick={handleAddStream}
            >
                <Typography variant="h4">+</Typography>
            </Button>
            <Box marginLeft={10}>
                <StreamList />
            </Box>
        </Box>
    )
}

export default StreamSection
