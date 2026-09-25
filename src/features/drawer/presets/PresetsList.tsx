import { Stack, Typography } from "@mui/material"
import { useMemo } from "react"
import { Channel, Preset } from "../../../types"
import PresetCard from "./PresetCard"

const PresetsList = ({ presets }: { presets: Array<Preset> }) => {
    const { presetsWithNoStreamsLive, presetsWithStreamsLive } = useMemo(() => {
        const presetsWithNoStreamsLive: Array<Preset> = []
        const presetsWithStreamsLive = presets.filter((preset) => {
            const liveChannels = preset.channels.filter((channel) => channel.stream !== undefined)

            if (liveChannels.length !== 0) {
                return true
            }

            presetsWithNoStreamsLive.push(preset)
            return false
        })

        presetsWithStreamsLive.sort((presetA, presetB) => {
            const presetAViewerCountTotal = presetA.channels.reduce(sumViewerCount, 0)
            const presetBViewerCountTotal = presetB.channels.reduce(sumViewerCount, 0)

            return presetAViewerCountTotal > presetBViewerCountTotal ? 1 : -1
        })

        presetsWithNoStreamsLive.sort((presetA, presetB) =>
            presetA.name.localeCompare(presetB.name),
        )

        return {
            presetsWithStreamsLive,
            presetsWithNoStreamsLive,
        }
    }, [presets])

    return (
        <Stack spacing={5}>
            <Stack gap={3}>
                {presetsWithStreamsLive.map((preset, index) => (
                    <PresetCard
                        key={index}
                        preset={preset}
                    />
                ))}
            </Stack>
            <Stack>
                <Typography variant="h5">No livestreams</Typography>
                {presetsWithNoStreamsLive.map((preset, index) => (
                    <Typography
                        key={index}
                        variant="body1"
                    >
                        {preset.name}
                    </Typography>
                ))}
            </Stack>
        </Stack>
    )
}

export const sumViewerCount = (total: number, channel: Channel) => {
    return total + parseInt(channel.stream?.viewerCount as string)
}

export default PresetsList
