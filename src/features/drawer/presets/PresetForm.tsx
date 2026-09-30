import AddCircleIcon from "@mui/icons-material/AddCircle"
import { IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useEffect, useState } from "react"
import AddPreset from "./AddPreset"
import { PresetContentView } from "./Presets"
import PresetViewChannelItem from "./PresetViewChannelItem"
import UpdatePreset from "./UpdatePreset"

export enum PresetFormType {
    Add,
    Update,
}

interface PresetFormProps {
    viewTitle: string
    initialChannels: Array<string>
    initialPresetName: string
    formType: PresetFormType
    setPresetContentView: React.Dispatch<React.SetStateAction<PresetContentView>>
}

const PresetForm = ({
    viewTitle,
    initialChannels,
    initialPresetName,
    formType,
    setPresetContentView,
}: PresetFormProps) => {
    const [channelTextField, setChannelTextField] = useState("")
    const [channels, setChannels] = useState(initialChannels)
    const [presetName, setPresetName] = useState(initialPresetName)
    const [errorMessage, setErrorMessage] = useState("")

    const theme = useTheme()

    useEffect(() => {
        if (!errorMessage) {
            return
        }

        const id = setTimeout(() => {
            setErrorMessage("")
        }, 3000)

        return () => clearTimeout(id)
    }, [errorMessage])

    const handleAddChannel = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const channelToLower = channelTextField.toLocaleLowerCase()
        if (!channels.includes(channelToLower)) {
            setChannels(channels.concat(channelToLower))
            setChannelTextField("")
        }
    }

    const handleRemoveChannel = (channelToRemove: string) => {
        const newChannels = channels.filter((channel) => channel !== channelToRemove)
        setChannels(newChannels)
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
                <form onSubmit={handleAddChannel}>
                    {/* using form because it handles the option of user adding new channels by pressing enter */}
                    <TextField
                        placeholder="Channel name"
                        sx={{ width: "50%" }}
                        value={channelTextField}
                        variant="standard"
                        InputProps={{
                            endAdornment: (
                                <IconButton type="submit">
                                    <AddCircleIcon color="primary" />
                                </IconButton>
                            ),
                        }}
                        onChange={(event) => {
                            setChannelTextField(event.target.value)
                        }}
                    />
                </form>
                <Stack width="50%">
                    {channels &&
                        channels.map((channel, index) => (
                            <PresetViewChannelItem
                                key={index}
                                channel={channel}
                                handleRemoveChannel={handleRemoveChannel}
                            />
                        ))}
                </Stack>
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                    width="100%"
                >
                    <Typography
                        color="secondary"
                        variant="body1"
                    >
                        {errorMessage}
                    </Typography>
                    {formType === PresetFormType.Add && (
                        <AddPreset
                            channels={channels}
                            presetName={presetName}
                            setErrorMessage={setErrorMessage}
                            setPresetContent={setPresetContentView}
                        />
                    )}
                    {formType === PresetFormType.Update && (
                        <UpdatePreset
                            channels={channels}
                            initialPresetName={initialPresetName}
                            presetName={presetName}
                            setErrorMessage={setErrorMessage}
                            setPresetContent={setPresetContentView}
                        />
                    )}
                </Stack>
            </Stack>
        </Paper>
    )
}

export default PresetForm
