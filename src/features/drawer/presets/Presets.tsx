import { Button, Typography } from "@mui/material"
import { Preset } from "../../../types"
import DrawerContainer from "../shared_components/DrawerContainer"
import DrawerHeader from "../shared_components/DrawerHeader"
import PresetsList from "./PresetsList"
import usePresets from "./hooks/usePresets"

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

const Presets = ({ handleDrawerClose }: PresetsProps) => {
    const { data: presets, error, isLoading } = usePresets()

    return (
        <DrawerContainer>
            <>
                <DrawerHeader
                    title="Presets"
                    handleDrawerClose={handleDrawerClose}
                >
                    <Button
                        color="primary"
                        variant="contained"
                    >
                        <Typography variant="h4">+</Typography>
                    </Button>
                </DrawerHeader>
                {!presets && <Typography variant="h4">No presets added yet</Typography>}
                <PresetsList presets={testPresets} />
            </>
        </DrawerContainer>
    )
}

export default Presets
