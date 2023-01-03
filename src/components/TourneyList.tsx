import React from "react"
import Grid from "@mui/material/Unstable_Grid2"
import { Box, Divider, List, ListItem, Paper, Stack, styled } from "@mui/material"

import { TourneyListEntry } from "./TourneyListEntry"

import { useLoaderData } from "react-router-dom"
import { TourneyListEntryProps } from "../types"

import tourneyEntriesService from "../services/tourneyEntries"

export const tourneyListLoader = async () => {
    return await tourneyEntriesService.getAll()
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }))

const TourneyList = () => {
    const tourneyEntries = useLoaderData() as TourneyListEntryProps[]

    return (
        <Stack spacing={0} divider={<Divider orientation="horizontal" flexItem />}>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
        </Stack>
    )
}

export default TourneyList

/*
    return (
        <Box 
        >
            <Paper elevation={20}>
                <List>
                    {tourneyEntries.map((tourneyEntry: TourneyListEntryProps) => {
                        return (
                            <TourneyListEntry
                                key={tourneyEntry.name}
                                id={tourneyEntry.id}
                                name={tourneyEntry.name}
                                dateTime={tourneyEntry.dateTime}
                            />
                        )
                    })}
                </List>
            </Paper>
        </Box>
    )
*/