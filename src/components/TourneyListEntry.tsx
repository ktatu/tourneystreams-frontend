import React from "react"
import { ListItem, ListItemText } from "@mui/material"
import { TourneyListEntryProps } from "../types"
import { Link } from "react-router-dom"

export const TourneyListEntry = ({ id, name, dateTime }: TourneyListEntryProps) => {
    const tourneyPageRelLink = `/tournaments/${id}`

    return (
        <Link to={tourneyPageRelLink}>
            <ListItem secondaryAction={<Timer dateTime={dateTime}/>}>
                <ListItemText primary={name} />
            </ListItem>
        </Link>
    )
}

const Timer = ({ dateTime }: { dateTime: string }) => {
    return (
        <p>{dateTime}</p>
    )
}