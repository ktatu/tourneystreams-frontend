import { Box, Typography } from "@mui/material"
import { useState } from "react"
import { TourneyInfo } from "../../types"
import TourneyAccordion from "./TourneyAccordion"
import "./TourneyDrawer.css"

const TourneyAccordionList = ({ tourneyNameFilter }: { tourneyNameFilter: string }) => {
    const [tourneyInfoArray, setTourneyInfoArray] = useState<Array<TourneyInfo>>([
        { tourneyName: "BLAST.tv Paris Major 2023: European RMR A", game: "apexlegends" },
    ])

    const tourneysFilteredByName = tourneyInfoArray.filter((tourney) =>
        tourney.tourneyName.includes(tourneyNameFilter)
    )

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

export default TourneyAccordionList
