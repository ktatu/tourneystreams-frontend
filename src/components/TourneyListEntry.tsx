import React from "react"
import { ListItem, ListItemText } from "@mui/material"
import { TourneyListEntryProps } from "../types"

export const TourneyListEntry = ({ name, dateTime }: TourneyListEntryProps) => {
    return (
        <ListItem secondaryAction={<Timer dateTime={dateTime}/>}>
            <ListItemText primary={name} />
        </ListItem>
    )
}

const Timer = ({ dateTime }: { dateTime: string }) => {
    return (
        <p>{dateTime}</p>
    )
}