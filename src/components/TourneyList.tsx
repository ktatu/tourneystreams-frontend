import React from "react"
import Grid from "@mui/material/Unstable_Grid2"
import { Box, Divider, List, ListItem, Paper } from "@mui/material"

import { TourneyListEntry } from "./TourneyListEntry"

import { useLoaderData } from "react-router-dom"
import { TourneyListEntryProps } from "../types"

import tourneyEntriesService from "../services/tourneyEntries"

export const tourneyListLoader = async () => {
    return await tourneyEntriesService.getAll()
}

const TourneyList = () => {
    const tourneyEntries = useLoaderData() as TourneyListEntryProps[]

    return (
        <Box sx={{
            bgcolor: "red",
            minWidth: "50%",
        }}>
            <Paper elevation={20} variant="outlined">
                <List>
                    {tourneyEntries.map((tourneyEntry: TourneyListEntryProps) => {
                        return (
                            <TourneyListEntry 
                                key={tourneyEntry.name}
                                name={tourneyEntry.name}
                                dateTime={tourneyEntry.dateTime}
                            />
                        )
                    })}
                </List>
            </Paper>
        </Box>
    )
}

export default TourneyList