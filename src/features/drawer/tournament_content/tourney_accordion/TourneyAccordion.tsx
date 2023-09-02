import { Accordion, AccordionSummary, Box, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import TourneyStartTime from "../TourneyStartTime"
import { useState } from "react"

import "/node_modules/flag-icons/css/flag-icons.min.css"
import { TourneyInfo } from "../types"

import TourneyAccordionDetails from "./TourneyAccordionDetails"

interface TourneyAccordionProps {
    tourneyInfo: TourneyInfo
}

const TourneyAccordion = ({ tourneyInfo }: TourneyAccordionProps) => {
    const [accordionExpanded, setAccordionExpanded] = useState(false)

    const handleAccordionExpandedStatus = () => {
        setAccordionExpanded(!accordionExpanded)
    }

    return (
        <Accordion
            TransitionProps={{ unmountOnExit: true }}
            onChange={handleAccordionExpandedStatus}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box
                    display="flex"
                    flexDirection="row"
                    flexGrow={1}
                    gap={3}
                >
                    <AccordionTitle
                        accordionExpanded={accordionExpanded}
                        tourneyName={tourneyInfo.name}
                    />
                    <Box flexGrow={1} />
                    <Box paddingRight={2}>
                        <TourneyStartTime startTimeAsDate={new Date(Date.now())} />
                    </Box>
                </Box>
            </AccordionSummary>
            <TourneyAccordionDetails
                streamInfoArray={tourneyInfo.streams}
                webLinks={tourneyInfo.webLinks}
            />
        </Accordion>
    )
}

interface AccordionTitleProps {
    tourneyName: string
    accordionExpanded: boolean
}

const AccordionTitle = ({ tourneyName, accordionExpanded }: AccordionTitleProps) => {
    const CHARACTER_LIMIT = 46

    if (tourneyName.length <= 46 || accordionExpanded) {
        return <Typography variant="h6">{tourneyName}</Typography>
    }

    return <Typography variant="h6">{`${tourneyName.substring(0, CHARACTER_LIMIT)}...`}</Typography>
}

export default TourneyAccordion
