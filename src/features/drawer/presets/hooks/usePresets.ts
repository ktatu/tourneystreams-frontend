import { useQuery } from "react-query"
import { fetch } from "../../../../commons/authRequests"
import { Channel, LocallyStoredPreset, Preset } from "../../../../types"
import PresetStorage from "../PresetsLocalStorage"

interface StreamQuery {
    channel: string
    broadcastName: string
    viewerCount: string
}

const presetStorage = PresetStorage.instance

const usePresets = () => {
    const initialPresetsToShow = presetStorage.getStoredPresets()

    const queryResult = useQuery<{
        presetsWithNoLiveStreams: Array<Preset | LocallyStoredPreset>
        presetsWithLiveStreams: Array<Preset>
        totalNumOfViewers: number
        totalNumOfStreams: number
    }>("presets", getPresets, {
        retry: 1,
        cacheTime: Infinity,
        staleTime: 100000,
        initialData: {
            presetsWithLiveStreams: [],
            presetsWithNoLiveStreams: initialPresetsToShow,
            totalNumOfStreams: 0,
            totalNumOfViewers: 0,
        },
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

const extractChannelsFromPresets = (presets: Array<LocallyStoredPreset>) =>
    presets.reduce((array: Array<string>, currPreset: LocallyStoredPreset) => {
        const set = new Set<string>(array)
        currPreset.channels.forEach((channel) => set.add(channel))
        return Array.from(set)
    }, [])

const queryStreams = async (channels: Array<string>) => {
    const res = await fetch<{ streams: Array<StreamQuery> }>("twitch/streams", {
        params: { channelIds: channels },
    })

    return res.data.streams
}

const addStreamQueryDataToPresets = (
    localPresets: Array<LocallyStoredPreset>,
    queriedStreams: Array<StreamQuery>,
) => {
    const streamsMap: Map<string, StreamQuery> = new Map()
    queriedStreams.forEach((stream) => {
        streamsMap.set(stream.channel, stream)
    })

    const presetsWithNoLiveStreams: Array<Preset> = []
    const presetsWithLiveStreams: Array<Preset> = localPresets.reduce(
        (array: Array<Preset>, currPreset: LocallyStoredPreset) => {
            const presetName = currPreset.name
            const channels: Array<Channel> = []
            let presetHasALiveStream = false

            currPreset.channels.forEach((channelId) => {
                const stream = streamsMap.get(channelId)
                const channel: Channel = { loginName: channelId }
                if (stream) {
                    channel.stream = stream
                    presetHasALiveStream = true
                }
                channels.push(channel)
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

export const sumViewerCount = (total: number, channel: Channel) => {
    return total + Number(channel.stream?.viewerCount ?? 0)
}

export default usePresets
