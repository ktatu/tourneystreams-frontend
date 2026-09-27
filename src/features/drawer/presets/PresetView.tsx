import AddCircleIcon from "@mui/icons-material/AddCircle"
import { IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useState } from "react"
import PresetViewChannelItem from "./PresetViewChannelItem"

interface PresetViewProps {
    viewTitle: string
    channels: Array<string>
    setChannels: React.Dispatch<React.SetStateAction<string[]>>
    children: JSX.Element
    presetName: string
    setPresetName: React.Dispatch<React.SetStateAction<string>>
}

const PresetView = ({
    viewTitle,
    channels,
    setChannels,
    children,
    presetName,
    setPresetName,
}: PresetViewProps) => {
    const [channelTextField, setChannelTextField] = useState("")

    const theme = useTheme()

    const handleAddChannel = (channel: string) => {
        if (!channels.includes(channel)) {
            setChannels(channels.concat(channel))
            setChannelTextField("")
        }
    }

    return (
        <Paper
            elevation={3}
            sx={{ width: "100%" }}
        >
            <Stack
                padding={2}
                spacing={3}
                width="100%"
            >
                <Typography variant="h5">{viewTitle}</Typography>
                <TextField
                    placeholder="Preset name"
                    value={presetName}
                    variant="standard"
                    sx={{
                        "& .MuiInputBase-input": {
                            ...theme.typography.h5,
                        },
                        width: "50%",
                    }}
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                        setPresetName(event.target.value)
                    }}
                />
                <TextField
                    placeholder="Channel name"
                    sx={{ width: "50%" }}
                    value={channelTextField}
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={() => handleAddChannel(channelTextField)}>
                                <AddCircleIcon />
                            </IconButton>
                        ),
                    }}
                    onChange={(event) => {
                        setChannelTextField(event.target.value)
                    }}
                />

                <Stack width="50%">
                    {" "}
                    {channels &&
                        channels.map((channel, index) => (
                            <PresetViewChannelItem
                                key={index}
                                channel={channel}
                            />
                        ))}
                </Stack>
                {children}
            </Stack>
        </Paper>
    )
}

export default PresetView
