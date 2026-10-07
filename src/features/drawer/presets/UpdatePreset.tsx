import { Button, Paper, Popper, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { addAlert } from "../../../commons/alertState"
import { TwitchChannel } from "../../../types"
import { PresetContentView } from "./Presets"
import PresetStorage from "./PresetsLocalStorage"
import usePresets from "./usePresets"

const presetStorage = PresetStorage.instance

interface UpdatePresetProps {
    setErrorMessage: (message: string) => void
    presetName: string
    initialPresetName: string
    channelNames: Array<string>
    setPresetContent: React.Dispatch<React.SetStateAction<PresetContentView>>
}

const UpdatePreset = ({
    setErrorMessage,
    initialPresetName,
    presetName,
    channelNames,
    setPresetContent,
}: UpdatePresetProps) => {
    const { refetch: refetchPresets } = usePresets()
    const [popperAnchorEl, setPopperAnchorEl] = useState<null | HTMLElement>(null)

    const popperOpen = Boolean(popperAnchorEl)

    const handleUpdatePreset = () => {
        try {
            const channels: Array<TwitchChannel> = channelNames.map((name) => {
                return { name }
            })

            presetStorage.updatePreset({ name: presetName, channels }, initialPresetName)
            addAlert(`Preset '${presetName}' updated`, "success")
            setPresetContent(PresetContentView.PresetsList)
            refetchPresets()
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            }
        }
    }

    const handleDeletePreset = () => {
        presetStorage.deletePreset(initialPresetName)
        refetchPresets()
        addAlert(`Preset '${initialPresetName}' deleted`, "success")
        setPresetContent(PresetContentView.PresetsList)
    }

    const handlePopperVisibility = (event: React.MouseEvent<HTMLElement>) => {
        if (popperAnchorEl) {
            setPopperAnchorEl(null)
            return
        }
        setPopperAnchorEl(event.currentTarget)
    }

    return (
        <>
            <Button
                color="error"
                variant="contained"
                onClick={handlePopperVisibility}
            >
                Delete
            </Button>
            <Popper
                anchorEl={popperAnchorEl}
                open={popperOpen}
                placement="bottom"
                sx={{ zIndex: 1000000 }}
            >
                <Paper sx={{ padding: 1 }}>
                    <Stack spacing={1}>
                        <Typography variant="h6">Confirm deletion</Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                        >
                            <Button
                                color="info"
                                variant="contained"
                                onClick={() => setPopperAnchorEl(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleDeletePreset}
                            >
                                Confirm
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Popper>
            <Button
                disabled={channelNames.length === 0 || !presetName}
                variant="contained"
                onClick={handleUpdatePreset}
            >
                Update
            </Button>
        </>
    )
}

export default UpdatePreset
