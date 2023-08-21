import { Box, Skeleton, Stack, Typography } from "@mui/material"
import { useState } from "react"
//import { TourneyInfo } from "../../types"
import TourneyAccordion from "./TourneyAccordion"
import { useQuery } from "react-query"
import { getTourneyInfos } from "../requests"
import "../TourneyDrawer.css"
import axios from "axios"
import { TourneyInfo } from "../types"
import useGameFilter from "../useGameFilter"

interface TourneyAccordionsProps {
    tourneyNameFilter: string
}

const TourneyAccordions = ({ tourneyNameFilter }: TourneyAccordionsProps) => {
    const { isLoading, isError, data, error } = useQuery<TourneyInfo[]>("tourneyInfo", async () => {
        const res = await axios.get<TourneyInfo[]>("http://localhost:3002/tourneyInfos")

        if (res.data === undefined) {
            throw new Error("No tourneys")
        }

        const tourneyInfoFilteredByGame = useGameFilter(res.data)

        return tourneyInfoFilteredByGame
    })

    if (isLoading) {
        return (
            <Box className="drawer-container">
                <TourneyAccordionListSkeleton />
            </Box>
        )
    }

    if (isError) {
        return (
            <Box className="drawer-container">
                <Typography variant="h5">Something went wrong with loading tournaments</Typography>
            </Box>
        )
    }

    return (
        <Box
            className="drawer-container"
            flexGrow={1}
            display="flex"
            flexDirection="column"
        >
            <Box flexGrow={1}>
                {data && data.length > 0 ? (
                    data.map((tourneyInfo) => (
                        <TourneyAccordion
                            key={tourneyInfo.name}
                            tourneyInfo={tourneyInfo}
                        />
                    ))
                ) : (
                    <Typography variant="h5">No tournaments match the current filters</Typography>
                )}
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                justifySelf="flex-end"
            >
                <Typography>
                    Tournament information is provided by
                    <a href="https://liquipedia.net">Liquipedia</a>
                </Typography>
            </Box>
        </Box>
    )
}

const TourneyAccordionListSkeleton = () => {
    return (
        <Stack
            direction="column"
            gap={5}
        >
            <TourneyAccordionSkeletonGroup />
            <TourneyAccordionSkeletonGroup />
        </Stack>
    )
}

const TourneyAccordionSkeletonGroup = () => {
    return (
        <div>
            <Box paddingBottom={1}>
                <Typography variant="h5">
                    <Skeleton
                        variant="rectangular"
                        width={70}
                    />
                </Typography>
            </Box>
            <Skeleton
                variant="rounded"
                width={420}
                height={250}
            />
        </div>
    )
}

export default TourneyAccordions
