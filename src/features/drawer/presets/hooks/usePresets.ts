import axios from "axios"
import { useQuery } from "react-query"
import { getCookie } from "typescript-cookie"
import { BACKEND_BASE_URL } from "../../../../envConfig"
import { Channel, LocallyStoredPreset, Preset } from "../../../../types"
import { getStoredPresets } from "../presetsLocalStorage"

interface StreamQuery {
    loginName: string
    broadcastName: string
    viewerCount: string
}

const usePresets = () => {
    const queryResult = useQuery<Preset[]>("presets", queryStreams, {
        retry: 1,
        cacheTime: 1000 * 100,
        staleTime: 1000 * 10 * 2,
    })

    return queryResult
}

const queryStreams = async () => {
    const locallyStoredPresets = getStoredPresets()

    if (!locallyStoredPresets || locallyStoredPresets.length === 0) {
        return []
    }

    // can token check be added directly to useQuery? (similarly to enabled: ...)
    const twitchToken = getCookie("twitch-token")

    if (!twitchToken) {
        throw new Error("Twitch token missing")
    }

    const loginNames = locallyStoredPresets.reduce(
        (array: Array<string>, currPreset: LocallyStoredPreset) => {
            const set = new Set<string>(array)
            currPreset.loginNames.forEach((loginName) => set.add(loginName))
            return Array.from(set)
        },
        [],
    )

    const res = await axios.get<{ streams: Array<StreamQuery> }>(
        `${BACKEND_BASE_URL}/twitch/streams`,
        {
            headers: { Authorization: `Bearer ${twitchToken}` },
            params: { channelIds: loginNames },
        },
    )

    const presetsWithStreamData = addStreamQueryDataToPresets(
        locallyStoredPresets,
        res.data.streams,
    )

    return presetsWithStreamData
}

const addStreamQueryDataToPresets = (
    localPresets: Array<LocallyStoredPreset>,
    queriedStreams: Array<StreamQuery>,
) => {
    const streamsMap: Map<string, StreamQuery> = new Map()
    queriedStreams.forEach((stream) => {
        streamsMap.set(stream.loginName, stream)
    })

    const presetsWithStreamData: Array<Preset> = localPresets.reduce(
        (array: Array<Preset>, currPreset: LocallyStoredPreset) => {
            const presetName = currPreset.name
            const channels: Array<Channel> = []

            currPreset.loginNames.forEach((channelId) => {
                const stream = streamsMap.get(channelId)
                const channel: Channel = { loginName: channelId }
                if (stream) {
                    channel.stream = stream
                }
                channels.push(channel)
            })

            const newPreset: Preset = { name: presetName, channels }
            return array.concat(newPreset)
        },
        [],
    )

    return presetsWithStreamData
}

export default usePresets
