import { Button, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { addAlert } from "../../../commons/alertState"
import PresetView from "./PresetView"
import { PresetContent } from "./Presets"
import { savePreset } from "./presetsLocalStorage"

interface AddPresetProps {
    handleViewChange: (newView: PresetContent) => void
}

const AddPreset = ({ handleViewChange }: AddPresetProps) => {
    const [channels, setChannels] = useState<Array<string>>([])
    const [presetName, setPresetName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const id = setTimeout(() => {
            setErrorMessage("")
        }, 3000)

        return () => clearTimeout(id)
    }, [errorMessage])

    const handleSavePreset = () => {
        try {
            savePreset({ name: presetName, loginNames: channels })
            addAlert("Preset added", "success")
            handleViewChange(PresetContent.PresetsList)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            }
        }
    }

    return (
        <PresetView
            channels={channels}
            presetName={presetName}
            setChannels={setChannels}
            setPresetName={setPresetName}
            viewTitle="Add preset"
        >
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
                <Button
                    disabled={channels.length === 0 || !presetName}
                    variant="contained"
                    onClick={handleSavePreset}
                >
                    Save
                </Button>
            </Stack>
        </PresetView>
    )
}

export default AddPreset
