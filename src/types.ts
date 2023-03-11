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
