import { useQuery } from "react-query"
import { fetch } from "../../../../commons/authRequests"
import { Preset, TwitchChannel } from "../../../../types"
import PresetStorage from "../PresetsLocalStorage"

interface StreamQuery {
    loginName: string
    broadcastName: string
    viewerCount: string
}

const presetStorage = PresetStorage.instance

const usePresets = () => {
    const initialPresetsToShow = presetStorage.getStoredPresets()

    const queryResult = useQuery<{
        presetsWithNoLiveStreams: Array<Preset>
        presetsWithLiveStreams: Array<Preset>
        totalNumOfViewers: number
        totalNumOfStreams: number
    }>("presets", getPresets, {
        retry: 1,
        cacheTime: Infinity,
        staleTime: 100000,
        enabled: initialPresetsToShow.length !== 0,
    })

    return queryResult
}

const getPresets = async () => {
    const locallyStoredPresets = presetStorage.getStoredPresets()

    if (locallyStoredPresets.length === 0) {
        return {
            presetsWithLiveStreams: [],
            presetsWithNoLiveStreams: [],
            totalNumOfViewers: 0,
            totalNumOfStreams: 0,
        }
    }

    const channelsOfAllPresets = extractChannelsFromPresets(locallyStoredPresets)
    const channelsWithLiveStreams = await queryStreams(channelsOfAllPresets)
    const { presetsWithLiveStreams, presetsWithNoLiveStreams } = addStreamQueryDataToPresets(
        locallyStoredPresets,
        channelsWithLiveStreams,
    )
    const { totalNumOfViewers, totalNumOfStreams } =
        getTotalNumOfViewersAndStreams(presetsWithLiveStreams)
    sortPresetsByViewerCount(presetsWithLiveStreams)
    sortPresetsAlphabetically(presetsWithNoLiveStreams)

    return {
        presetsWithLiveStreams,
        presetsWithNoLiveStreams,
        totalNumOfViewers,
        totalNumOfStreams,
    }
}

const extractChannelsFromPresets = (presets: Array<Preset>) =>
    presets.reduce((array: Array<string>, currPreset: Preset) => {
        const set = new Set<string>(array)
        currPreset.channels.forEach((channel) => set.add(channel.name))
        return Array.from(set)
    }, [])

const queryStreams = async (channels: Array<string>) => {
    const res = await fetch<{ streams: Array<StreamQuery> }>("twitch/streams", {
        params: { channels },
    })
    return res.data.streams
}

const addStreamQueryDataToPresets = (
    localPresets: Array<Preset>,
    queriedStreams: Array<StreamQuery>,
) => {
    const streamsMap: Map<string, StreamQuery> = new Map()
    queriedStreams.forEach((stream) => {
        streamsMap.set(stream.loginName, stream)
    })

    const presetsWithNoLiveStreams: Array<Preset> = []
    const presetsWithLiveStreams: Array<Preset> = localPresets.reduce(
        (array: Array<Preset>, currPreset: Preset) => {
            const presetName = currPreset.name
            const channels: Array<TwitchChannel> = []
            let presetHasALiveStream = false

            currPreset.channels.forEach((channel) => {
                const stream = streamsMap.get(channel.name)
                const channelToAdd: TwitchChannel = { name: channel.name }
                if (stream) {
                    channelToAdd.stream = stream
                    presetHasALiveStream = true
                }
                channels.push(channelToAdd)
            })

            const newPreset: Preset = { name: presetName, channels }
            if (presetHasALiveStream) {
                return array.concat(newPreset)
            } else {
                presetsWithNoLiveStreams.push(newPreset)
                return array
            }
        },
        [],
    )

    return { presetsWithLiveStreams, presetsWithNoLiveStreams }
}

interface ViewersAndStreams {
    totalNumOfViewers: number
    totalNumOfStreams: number
}

const getTotalNumOfViewersAndStreams = (presets: Array<Preset>) =>
    presets.reduce(
        ({ totalNumOfViewers, totalNumOfStreams }: ViewersAndStreams, preset) => {
            let currPresetNumOfViewers = 0
            let currPresetNumOfStreams = 0

            preset.channels.forEach((channel) => {
                if (channel.stream) {
                    currPresetNumOfViewers += parseInt(channel.stream.viewerCount)
                    currPresetNumOfStreams++
                }
            })

            return {
                totalNumOfViewers: totalNumOfViewers + currPresetNumOfViewers,
                totalNumOfStreams: totalNumOfStreams + currPresetNumOfStreams,
            }
        },
        { totalNumOfViewers: 0, totalNumOfStreams: 0 },
    )

const sortPresetsByViewerCount = (presets: Array<Preset>) =>
    presets.sort((presetA, presetB) => {
        const presetAViewerCountTotal = presetA.channels.reduce(sumViewerCount, 0)
        const presetBViewerCountTotal = presetB.channels.reduce(sumViewerCount, 0)

        return presetAViewerCountTotal > presetBViewerCountTotal ? 1 : -1
    })

const sortPresetsAlphabetically = (presets: Array<Preset>) =>
    presets.sort((presetA, presetB) => presetA.name.localeCompare(presetB.name))

export const sumViewerCount = (total: number, channel: TwitchChannel) => {
    return total + Number(channel.stream?.viewerCount ?? 0)
}

export default usePresets
