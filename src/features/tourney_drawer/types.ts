export enum Game {
    ApexLegends = "Apex Legends",
    Valorant = "Valorant",
}

export interface TourneyInfo {
    id: number
    date: string
    game: Game
    name: string
    streams: Array<StreamInfo>
    time: string
    webLinks: Array<WebLink>
}

export enum WebLink {
    Homepage,
    Liquipedia,
    Twitter,
}

export interface StreamInfo {
    channelLink: string
    channel: string
}
