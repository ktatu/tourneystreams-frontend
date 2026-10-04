// AI-assisted by GitHub Copilot (Claude Sonnet 5.5): text field state and validation moved to react-hook-form.
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
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

interface PresetFormValues {
    presetName: string
    channelName: string
}

const MAX_CHANNEL_NAME_LENGTH = 25
const MIN_CHANNEL_NAME_LENGTH = 4
const MAX_PRESET_NAME_LENGTH = 30

const PresetForm = ({
    viewTitle,
    initialChannels,
    initialPresetName,
    formType,
    setPresetContentView,
}: PresetFormProps) => {
    const [channels, setChannels] = useState(initialChannels)
    const [errorMessage, setErrorMessage] = useState("")
    const {
        register,
        watch,
        trigger,
        getValues,
        resetField,
        formState: { errors },
    } = useForm<PresetFormValues>({
        mode: "onChange",
        defaultValues: { presetName: initialPresetName, channelName: "" },
    })

    // Children disable their save button on an empty name, so invalid names are passed as empty
    const presetName = errors.presetName ? "" : watch("presetName").trim()

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

    const handleAddChannel = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Only the channel field is validated here so a bad preset name doesn't block adding channels
        if (!(await trigger("channelName"))) {
            return
        }

        const channelToLower = getValues("channelName").trim().toLocaleLowerCase()
        setChannels(channels.concat(channelToLower))
        resetField("channelName", { defaultValue: "" })
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
                spacing={3}
                sx={{
                    padding: 2,
                    width: "100%",
                }}
            >
                <Typography variant="h5">{viewTitle}</Typography>
                <TextField
                    error={Boolean(errors.presetName)}
                    helperText={errors.presetName?.message}
                    placeholder="Preset name"
                    variant="standard"
                    sx={{
                        "& .MuiInputBase-input": {
                            ...theme.typography.h5,
                        },
                        width: "50%",
                    }}
                    onFocus={(event) => event.target.select()}
                    {...register("presetName", {
                        required: "Preset name is required",
                        maxLength: {
                            value: MAX_PRESET_NAME_LENGTH,
                            message: `Preset name can be at most ${MAX_PRESET_NAME_LENGTH} characters`,
                        },
                        validate: (value) => value.trim() !== "" || "Preset name is required",
                    })}
                />
                <form onSubmit={handleAddChannel}>
                    {/* using form because it handles the option of user adding new channels by pressing enter */}
                    <TextField
                        error={Boolean(errors.channelName)}
                        helperText={errors.channelName?.message}
                        placeholder="Channel name"
                        sx={{ width: "50%" }}
                        variant="standard"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton type="submit">
                                        <AddCircleIcon color="primary" />
                                    </IconButton>
                                ),
                            },
                        }}
                        {...register("channelName", {
                            required: "Channel name is required",
                            maxLength: {
                                value: MAX_CHANNEL_NAME_LENGTH,
                                message: `Channel name can be at most ${MAX_CHANNEL_NAME_LENGTH} characters`,
                            },
                            minLength: {
                                value: MIN_CHANNEL_NAME_LENGTH,
                                message: `Channel name has to be at least ${MIN_CHANNEL_NAME_LENGTH} characters`,
                            },
                            pattern: {
                                value: /^\w+$/,
                                message: "Only letters, numbers and underscores are allowed",
                            },
                            validate: (value) =>
                                !channels.includes(value.toLocaleLowerCase()) ||
                                "Channel is already added",
                        })}
                    />
                </form>
                <Stack
                    sx={{
                        width: "50%",
                    }}
                >
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
                    direction="row"
                    spacing={2}
                    sx={{
                        alignItems: "center",
                        justifyContent: "flex-end",
                        width: "100%",
                    }}
                >
                    <Typography
                        color="secondary"
                        variant="body1"
                    >
                        {errorMessage}
                    </Typography>
                    {formType === PresetFormType.Add && (
                        <AddPreset
                            channelNames={channels}
                            presetName={presetName}
                            setErrorMessage={setErrorMessage}
                            setPresetContent={setPresetContentView}
                        />
                    )}
                    {formType === PresetFormType.Update && (
                        <UpdatePreset
                            channelNames={channels}
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
