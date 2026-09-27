import { Button, Typography } from "@mui/material"
import { useState } from "react"
import { Preset } from "../../../types"
import DrawerContainer from "../shared_components/DrawerContainer"
import DrawerHeader from "../shared_components/DrawerHeader"
import AddPreset from "./AddPreset"
import usePresets from "./hooks/usePresets"
import PresetsList from "./PresetsList"

interface PresetsProps {
    handleDrawerClose: () => void
}

const testPresets: Array<Preset> = [
    {
        name: "test123",
        channels: [
            { loginName: "crayon_fps", stream: { broadcastName: "crayon", viewerCount: "5865" } },
            { loginName: "surefour", stream: { broadcastName: "surefour", viewerCount: "2154" } },
            { loginName: "imaqtpie" },
        ],
    },
    {
        name: "ttt",
        channels: [
            { loginName: "crayon_fps", stream: { broadcastName: "crayon", viewerCount: "55865" } },
            { loginName: "surefour", stream: { broadcastName: "surefour", viewerCount: "2154" } },
            { loginName: "imaqtpie" },
        ],
    },
    {
        name: "nolives",
        channels: [{ loginName: "forsen" }],
    },
]

export enum PresetContent {
    PresetView,
    PresetsList,
}

const Presets = ({ handleDrawerClose }: PresetsProps) => {
    const [presetContent, setPresetContent] = useState(PresetContent.PresetsList)

    const { data: presets, error, isLoading } = usePresets()

    const handleContentViewChange = (newView: PresetContent) => {
        setPresetContent(newView)
    }

    return (
        <DrawerContainer>
            <>
                <DrawerHeader
                    handleDrawerClose={handleDrawerClose}
                    title="Presets"
                >
                    <ContentViewSwitchButton
                        handleChange={handleContentViewChange}
                        presetContent={presetContent}
                    />
                </DrawerHeader>
                {presetContent === PresetContent.PresetsList && (
                    <PresetsList presets={testPresets} />
                )}
                {presetContent === PresetContent.PresetView && (
                    <AddPreset handleViewChange={handleContentViewChange} />
                )}
            </>
        </DrawerContainer>
    )
}

interface ContentViewSwitchButtonProps {
    presetContent: PresetContent
    handleChange: (content: PresetContent) => void
}

const ContentViewSwitchButton = ({ presetContent, handleChange }: ContentViewSwitchButtonProps) => {
    if (presetContent === PresetContent.PresetView) {
        return (
            <Button
                color="secondary"
                variant="contained"
                onClick={() => handleChange(PresetContent.PresetsList)}
            >
                <Typography variant="body1">cancel</Typography>
            </Button>
        )
    }

    return (
        <Button
            color="primary"
            variant="contained"
            onClick={() => handleChange(PresetContent.PresetView)}
        >
            <Typography variant="h4">+</Typography>
        </Button>
    )
}

export default Presets
