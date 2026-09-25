export interface Stream {
    id: string
    displayPosition: number
    streamSource: StreamSource
}

export interface Channel {
    loginName: string
    stream?: PresetStream
}

export interface Preset {
    name: string
    channels: Array<Channel>
}

export interface PresetStream {
    broadcastName: string
    viewerCount: string
}

export interface LocallyStoredPreset {
    name: string
    loginNames: Array<string>
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

export interface TourneyCardProps {
    id: number
    name: string
    dateTime: string
    liquipediaPage: string
    homePage: string
}

export interface TourneyDetailsProps {
    id: number
    tourneyInfo: TourneyCardProps
    participants: Team[]
}

export interface Team {
    teamName: string
    players: Player[]
}

export interface Player {
    name: string
}

export interface MouseEventHandler {
    (event: React.MouseEvent<HTMLElement>): void
}

export interface PresetQueryData {
    name: string
}

interface TourneyGeneralInfo {
    id: number
    time: string
    name: string
}

interface TourneyDate {
    [game: string]: TourneyGeneralInfo[]
}

interface TourneyInfos {
    [date: string]: TourneyDate
}
