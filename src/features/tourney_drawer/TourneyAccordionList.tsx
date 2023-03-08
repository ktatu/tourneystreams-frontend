import { Box, Skeleton, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { TourneyInfo } from "../../types"
import TourneyAccordion from "./TourneyAccordion"
import { useQuery } from "react-query"
import { getTourneyInfos } from "./requests"
import "./TourneyDrawer.css"

const TourneyAccordionList = ({ tourneyNameFilter }: { tourneyNameFilter: string }) => {
    const [tourneyInfoArray, setTourneyInfoArray] = useState<Array<TourneyInfo>>([
        { tourneyName: "BLAST.tv Paris Major 2023: European RMR A", game: "apexlegends" },
    ])

    const { isLoading, isError, data, error } = useQuery("tourneyInfo", getTourneyInfos)

    const tourneysFilteredByName = tourneyInfoArray.filter((tourney) =>
        tourney.tourneyName.includes(tourneyNameFilter)
    )

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
        <Box className="drawer-container">
            <Typography variant="h5">Today</Typography>
            {tourneysFilteredByName.map((tourney) => (
                <TourneyAccordion
                    key={tourney.tourneyName}
                    tourneyName={tourney.tourneyName}
                />
            ))}
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

export default TourneyAccordionList
