import { Edit } from "@mui/icons-material"
import { Button, CircularProgress, Stack, Typography } from "@mui/material"
import { AxiosError } from "axios"
import { useState } from "react"
import { Preset } from "../../../types"
import TwitchConnect from "../shared_components/TwitchConnect"
import PresetCard from "./PresetCard"
import usePresets from "./hooks/usePresets"

interface PresetsListProps {
    handleChangeToPresetUpdate: (preset: Preset) => void
}

const PresetsList = ({ handleChangeToPresetUpdate }: PresetsListProps) => {
    const { data, error, isFetching, isFetched } = usePresets()
    const [showConnectToTwitch, setShowConnectToTwitch] = useState(false)

    if (error) {
        if (error instanceof AxiosError && error.status === 401) {
            setShowConnectToTwitch(true)
        }
    }

    const noPresetsAddedYet = () => {
        // this is for typescript, data always exists because of placeholder data
        if (!data) {
            return
        }
        const numOfPresetsWithStreams = data.presetsWithLiveStreams.length
        const numOfWithout = data.presetsWithNoLiveStreams.length

        return numOfPresetsWithStreams + numOfWithout === 0 ? true : false
    }

    if (noPresetsAddedYet()) {
        return <Typography>No presets added yet</Typography>
    }

    if (data) {
        const { presetsWithNoLiveStreams, presetsWithLiveStreams } = data

        return (
            <Stack spacing={1}>
                <Stack
                    minHeight={100}
                    spacing={2}
                >
                    {showConnectToTwitch && (
                        <TwitchConnect message="Connect your Twitch account to see which presets have livestreams" />
                    )}
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
                    {isFetched && presetsWithLiveStreams.length === 0 && (
                        <Typography variant="h5">No livestreams currently</Typography>
                    )}
                </Stack>
                <Stack gap={3}>
                    {presetsWithLiveStreams.map((preset, index) => (
                        <PresetCard
                            key={index}
                            handleChangeToPresetUpdate={handleChangeToPresetUpdate}
                            preset={preset}
                        />
                    ))}
                </Stack>
                <Stack
                    paddingTop={5}
                    spacing={1}
                >
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

    // should be safe to return null: data-object always exists since usePresets has placeholder data
    return null
}

export default PresetsList
