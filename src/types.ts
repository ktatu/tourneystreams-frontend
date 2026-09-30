export interface Stream {
    id: string
    displayPosition: number
    streamSource: StreamSource
}

export interface TwitchChannel {
    name: string
    stream?: PresetStream
}

export interface Preset {
    name: string
    channels: Array<TwitchChannel>
}

export interface PresetStream {
    broadcastName: string
    viewerCount: string
}

export interface LocallyStoredPreset {
    name: string
    channels: Array<string>
}

export interface TwitchStream {
    category: string
    title: string
    loginName: string
    broadcastName: string
    viewerCount: number
    profileImageUrl: string
}

export enum StreamSource {
    TWITCH = "twitch",
    YOUTUBE = "youtube",
}
