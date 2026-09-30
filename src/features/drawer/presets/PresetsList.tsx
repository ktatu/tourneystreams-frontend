import { Edit } from "@mui/icons-material"
import { Button, Stack } from "@mui/material"
import { Preset } from "../../../types"
import PlaceholderSkeleton from "../shared_components/PlaceholderSkeleton"
import PresetCard from "./PresetCard"
import usePresets from "./hooks/usePresets"

interface PresetsListProps {
    handleChangeToPresetUpdate: (preset: Preset) => void
}

const PresetsList = ({ handleChangeToPresetUpdate }: PresetsListProps) => {
    const { data, error, isLoading } = usePresets()

    if (isLoading) {
        return (
            <PlaceholderSkeleton
                count={2}
                gap={5}
                height={250}
                width={350}
            />
        )
    }

    if (data) {
        const {
            presetsWithNoLiveStreams,
            presetsWithLiveStreams,
            totalNumOfViewers,
            totalNumOfStreams,
        } = data

        return (
            <Stack spacing={5}>
                <Stack gap={3}>
                    {presetsWithLiveStreams.map((preset, index) => (
                        <PresetCard
                            key={index}
                            preset={preset}
                        />
                    ))}
                </Stack>
                <Stack spacing={1}>
                    {presetsWithNoLiveStreams.map((preset, index) => (
                        <Stack
                            key={index}
                            alignItems="center"
                            direction="row"
                        >
                            <Button
                                fullWidth
                                startIcon={<Edit color="primary" />}
                                sx={{ justifyContent: "flex-start" }}
                                variant="text"
                                onClick={() => handleChangeToPresetUpdate(preset)}
                            >
                                {preset.name}
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        )
    }

    return null
}

export default PresetsList
