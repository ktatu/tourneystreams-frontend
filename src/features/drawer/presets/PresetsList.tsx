// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import { Edit } from "@mui/icons-material"
import { Button, Stack, Typography } from "@mui/material"
import { AxiosError } from "axios"
import { Preset } from "../../../types"
import DrawerCardSkeleton from "../shared_components/DrawerCardSkeleton"
import TwitchConnect from "../shared_components/TwitchConnect"
import PresetCard from "./PresetCard"
import usePresets from "./usePresets"

interface PresetsListProps {
    handleChangeToPresetUpdate: (preset: Preset) => void
}

const PresetsList = ({ handleChangeToPresetUpdate }: PresetsListProps) => {
    const { data, error, isFetched, isLoading } = usePresets()

    if (isLoading) {
        return (
            <DrawerCardSkeleton
                count={2}
                gap={5}
            />
        )
    }

    if (error) {
        if (error instanceof AxiosError) {
            return (
                <TwitchConnect message="Connect your Twitch account to see which presets have livestreams" />
            )
        }
        return <Typography variant="h5">Unexpected error, try again later</Typography>
    }

    if (data) {
        const { presetsWithNoLiveStreams, presetsWithLiveStreams } = data

        return (
            <Stack spacing={1}>
                {isFetched && presetsWithLiveStreams.length === 0 && (
                    <Typography variant="h5">No livestreams currently</Typography>
                )}
                <Stack
                    sx={{
                        gap: 3,
                    }}
                >
                    {presetsWithLiveStreams.map((preset, index) => (
                        <PresetCard
                            key={index}
                            handleChangeToPresetUpdate={handleChangeToPresetUpdate}
                            preset={preset}
                        />
                    ))}
                </Stack>
                <Stack
                    spacing={1}
                    sx={{
                        paddingTop: 5,
                    }}
                >
                    {presetsWithNoLiveStreams.map((preset, index) => (
                        <Stack
                            key={index}
                            direction="row"
                            sx={{
                                alignItems: "center",
                            }}
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

    return <Typography variant="h5">No presets added yet</Typography>
}

export default PresetsList
