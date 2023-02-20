import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import HomeIcon from "@mui/icons-material/Home"
import TourneyStartTime from "./TourneyStartTime"
import { useState } from "react"

const TourneyAccordion = () => {
    const [accordionExpanded, setAccordionExpanded] = useState(false)

    const handleAccordionExpandedStatus = () => {
        setAccordionExpanded(!accordionExpanded)
    }

    return (
        <Box className="drawer-container">
            <Typography variant="h5">Today</Typography>
            <Accordion
                TransitionProps={{ unmountOnExit: true }}
                onChange={handleAccordionExpandedStatus}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box
                        display="flex"
                        flexDirection="row"
                        gap={3}
                        paddingRight={2}
                    >
                        <AccordionTitle
                            tourneyName="BLAST.tv Paris Major 2023: European RMR A"
                            accordionExpanded={accordionExpanded}
                        />
                        <Box flexGrow={1} />
                        <Box
                            display="flex"
                            alignItems="center"
                        >
                            <TourneyStartTime startTimeAsDate={new Date(Date.now())} />
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                    >
                        <Box
                            display="flex"
                            flexDirection="row"
                            paddingRight={5}
                        >
                            <Box paddingRight="8px">
                                <img
                                    src={require("./assets/liquipedia.png")}
                                    width={32}
                                    height={26}
                                />
                            </Box>
                            <Box paddingRight="10px">
                                <img
                                    src={require("./assets/twitter.png")}
                                    width={32}
                                    height={26}
                                />
                            </Box>
                            <HomeIcon sx={{ transform: "scale(1.5)", marginTop: "2px" }} />
                        </Box>
                        <Box>
                            <Typography>Official streams:</Typography>
                        </Box>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
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
