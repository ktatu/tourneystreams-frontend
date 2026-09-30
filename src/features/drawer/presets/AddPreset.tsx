import { Button } from "@mui/material"
import { addAlert } from "../../../commons/alertState"
import usePresets from "./hooks/usePresets"
import { PresetContentView } from "./Presets"
import PresetStorage from "./PresetsLocalStorage"

const presetStorage = PresetStorage.instance

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
            presetStorage.savePreset({ name: presetName, channels: channels })
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
