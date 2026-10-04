import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { Preset } from "../../../types"
import DrawerContainer from "../shared_components/DrawerContainer"
import DrawerHeader from "../shared_components/DrawerHeader"
import PresetForm, { PresetFormType } from "./PresetForm"
import PresetsList from "./PresetsList"

interface PresetsProps {
    handleDrawerClose: () => void
}

export enum PresetContentView {
    AddPreset,
    UpdatePreset,
    PresetsList,
}

const Presets = ({ handleDrawerClose }: PresetsProps) => {
    const [presetContentView, setPresetContentView] = useState(PresetContentView.PresetsList)
    const [presetToUpdate, setPresetToUpdate] = useState<Preset | null>(null)

    const handleChangeToPresetUpdate = (preset: Preset) => {
        setPresetToUpdate(preset)
        setPresetContentView(PresetContentView.UpdatePreset)
    }

    return (
        <DrawerContainer>
            <>
                <DrawerHeader
                    handleDrawerClose={handleDrawerClose}
                    title="Presets"
                >
                    <OpenAddPresetFormButton
                        presetContent={presetContentView}
                        setPresetContentView={setPresetContentView}
                    />
                </DrawerHeader>
                {presetContentView === PresetContentView.AddPreset && (
                    <PresetForm
                        formType={PresetFormType.Add}
                        initialChannels={[]}
                        initialPresetName="New preset"
                        setPresetContentView={setPresetContentView}
                        viewTitle="Add preset"
                    />
                )}
                {presetContentView === PresetContentView.PresetsList && (
                    <Box sx={{
                        marginTop: 10
                    }}>
                        <PresetsList handleChangeToPresetUpdate={handleChangeToPresetUpdate} />
                    </Box>
                )}
                {presetContentView === PresetContentView.UpdatePreset && presetToUpdate && (
                    <PresetForm
                        formType={PresetFormType.Update}
                        initialPresetName={structuredClone(presetToUpdate?.name)}
                        setPresetContentView={setPresetContentView}
                        viewTitle="Update preset"
                        initialChannels={structuredClone(
                            presetToUpdate?.channels.map((channel) => channel.name),
                        )}
                    />
                )}
            </>
        </DrawerContainer>
    )
}

/*
 */

interface OpenAddPresetFormButtonProps {
    presetContent: PresetContentView
    setPresetContentView: React.Dispatch<React.SetStateAction<PresetContentView>>
}

const OpenAddPresetFormButton = ({
    presetContent,
    setPresetContentView,
}: OpenAddPresetFormButtonProps) => {
    if (presetContent !== PresetContentView.PresetsList) {
        return (
            <Button
                color="info"
                variant="contained"
                onClick={() => setPresetContentView(PresetContentView.PresetsList)}
            >
                cancel
            </Button>
        )
    }

    return (
        <Button
            color="primary"
            variant="contained"
            onClick={() => setPresetContentView(PresetContentView.AddPreset)}
        >
            <Typography variant="h4">+</Typography>
        </Button>
    )
}

export default Presets
