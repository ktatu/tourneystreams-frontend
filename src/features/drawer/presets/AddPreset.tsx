import { Button } from "@mui/material"
import { addAlert } from "../../../commons/alertState"
import { PresetContentView } from "./Presets"
import usePresets from "./hooks/usePresets"
import { savePreset } from "./presetsLocalStorage"

interface AddPresetProps {
    setErrorMessage: (message: string) => void
    presetName: string
    channels: Array<string>
    setPresetContent: React.Dispatch<React.SetStateAction<PresetContentView>>
}

const AddPreset = ({ setErrorMessage, presetName, channels, setPresetContent }: AddPresetProps) => {
    const { refetch: refetchPresets } = usePresets()

    const handleSavePreset = () => {
        try {
            savePreset({ name: presetName, loginNames: channels })
            addAlert("Preset added", "success")
            setPresetContent(PresetContentView.PresetsList)
            refetchPresets()
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            }
        }
    }

    return (
        <Button
            disabled={channels.length === 0 || !presetName}
            variant="contained"
            onClick={handleSavePreset}
        >
            Save
        </Button>
    )
}

export default AddPreset
