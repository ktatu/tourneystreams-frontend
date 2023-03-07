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

export interface TourneyInfo {
    tourneyName: string
    game: string
}

export enum Game {
    ApexLegends = "Apex Legends",
    Valorant = "Valorant",
}
