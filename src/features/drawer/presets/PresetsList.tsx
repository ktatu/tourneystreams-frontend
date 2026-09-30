import { Edit } from "@mui/icons-material"
import { Button, CircularProgress, Stack, Typography } from "@mui/material"
import { Preset } from "../../../types"
import TwitchConnect from "../shared_components/TwitchConnect"
import PresetCard from "./PresetCard"
import usePresets from "./hooks/usePresets"

interface PresetsListProps {
    handleChangeToPresetUpdate: (preset: Preset) => void
}

const PresetsList = ({ handleChangeToPresetUpdate }: PresetsListProps) => {
    const { data, error, isLoading, isFetching, isFetched } = usePresets()

    if (error) {
        // 2 types of errors to handle: status 401, need to show connect
        // everything else: say
        return <TwitchConnect />
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
                {isFetching && (
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <Typography
                            alignItems="center"
                            variant="h5"
                        >
                            Checking for livestreams
                        </Typography>
                        <CircularProgress />
                    </Stack>
                )}
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

    // safe to return null: data-object always exists since usePresets has initial data
    return null
}

export default PresetsList
