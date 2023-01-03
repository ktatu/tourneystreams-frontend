import React, { useEffect } from "react"
import tourneyDetailsService from "./services/tourneyDetails"

import { useLoaderData } from "react-router-dom"
import { Player, Team, TourneyDetailsProps } from "./types"

export const tourneyPageLoader = async ({ params }: { params: any }) => {
    return await tourneyDetailsService.getTourneyDetails(params.id)
}

const TourneyPage = () => {
    const tourneyDetails = useLoaderData() as TourneyDetailsProps

    const info = tourneyDetails.tourneyInfo
    const participants = tourneyDetails.participants

    return (
        <div>
            <h1>{info.name} {info.dateTime}</h1>
            <h2>participants</h2>
            {participants.map((team: Team) => {
                return (
                    <div key={team.teamName}>
                        <h3>{team.teamName}</h3>
                        {team.players.map((player: Player) => {
                            return (
                                <li key={player.name}>{player.name}</li>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default TourneyPage