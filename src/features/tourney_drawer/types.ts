export enum Game {
    ApexLegends = "Apex Legends",
    Valorant = "Valorant",
}

export interface TourneyInfo {
    id: number
    date: string
    game: Game
    name: string
    time: string
}

export enum WebLink {
    Homepage,
    Liquipedia,
    Twitter,
}

export interface TourneyDetails {
    id: number
    streams: Array<Stream>
    webLinks: Array<WebLink>
}

export interface Stream {
    channelLink: string
    channel: string
}
