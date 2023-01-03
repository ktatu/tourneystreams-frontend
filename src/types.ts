export interface TourneyListEntryProps {
    id: number,
    name: string,
    dateTime: string
}

export interface TourneyDetailsProps {
    id: number,
    tourneyInfo: TourneyListEntryProps,
    participants: Team[]
}

export interface Team {
    teamName: string,
    players: Player[]
}

export interface Player {
    name: string
}