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
    webLinks: WebLinks
}

export interface WebLinks {
    liquipedia?: string
    twitter?: string
    homePage?: string
}

export interface StreamInfo {
    channelLink: string
    channel: string
}
