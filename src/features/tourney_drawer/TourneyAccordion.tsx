import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    Switch,
    Tooltip,
    Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import HomeIcon from "@mui/icons-material/Home"
import TourneyStartTime from "./TourneyStartTime"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

import BoyIcon from "@mui/icons-material/Boy"

import useQueryParams from "../../hooks/useQueryParams"

import "/node_modules/flag-icons/css/flag-icons.min.css"
import { TourneyDetails, TourneyInfo } from "./types"
import { useQuery } from "react-query"

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
                    flexGrow={1}
                    flexDirection="row"
                    gap={3}
                >
                    <AccordionTitle
                        tourneyName={tourneyInfo.name}
                        accordionExpanded={accordionExpanded}
                    />
                    <Box flexGrow={1} />
                    <Box paddingRight={2}>
                        <TourneyStartTime startTimeAsDate={new Date(Date.now())} />
                    </Box>
                </Box>
            </AccordionSummary>
            <TourneyAccordionDetails tourneyDetailsId={tourneyInfo.id} />
        </Accordion>
    )
}

interface TourneyAccordionDetailsProps {
    tourneyDetailsId: number
}

const TourneyAccordionDetails = ({ tourneyDetailsId }: TourneyAccordionDetailsProps) => {
    const { isLoading, isError, data, error } = useQuery<TourneyDetails>(
        "tourneyDetails",
        async () => {
            const res = await axios.get<TourneyDetails>(
                `http://localhost:3001/tourneyDetails/${tourneyDetailsId}`
            )

            if (res.data === undefined) {
                throw new Error("Error loading tournament details")
            }

            return res.data
        }
    )

    return (
        <AccordionDetails>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    gap={1}
                >
                    <Stack
                        direction="row"
                        gap={1}
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
                    </Stack>
                    <Tooltip title="Total viewers">
                        <Box
                            alignItems="center"
                            display="flex"
                            flexDirection="row"
                            gap={1}
                            paddingLeft={6}
                        >
                            <Typography
                                color="#F75750"
                                variant="h6"
                            >
                                1000
                            </Typography>
                            <BoyIcon sx={{ color: "#F75750" }} />
                        </Box>
                    </Tooltip>
                    <Typography
                        paddingLeft={3}
                        variant="h6"
                    >
                        A-Tier
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={1}
                >
                    <Typography>Streams:</Typography>
                    <AccordionStreamInfo
                        channelLink="https://twitch.tv/imaqtpie"
                        channelName="imaqtpie"
                    />
                </Box>
            </Box>
        </AccordionDetails>
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

interface AccordionStreamInfoProps {
    channelLink: string
    channelName: string
}

const AccordionStreamInfo = ({ channelLink, channelName }: AccordionStreamInfoProps) => {
    const [streamToggled, setStreamToggled] = useState(false)
    const channels = useQueryParams("channel")

    const handleStreamToggle = (previousToggleValue: boolean) => {
        if (previousToggleValue) {
            channels.removeValue(channelName)
        } else {
            channels.addValue(channelName)
        }
    }

    useEffect(() => {
        if (channels.getValuesAsArray().includes(channelName)) {
            setStreamToggled(true)
        } else {
            setStreamToggled(false)
        }
    }, [channels])

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={1}
        >
            <Tooltip title="Finnish">
                <span
                    id="country-flag"
                    className="fi fi-fi"
                />
            </Tooltip>
            <Typography>
                <a
                    style={{ textDecoration: "none", color: "#347deb" }}
                    href={channelLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    {channelName}
                </a>
            </Typography>
            <span style={{ color: "#F75750" }}>(1000)</span>
            <Switch
                checked={streamToggled}
                onChange={() => handleStreamToggle(streamToggled)}
            />
        </Box>
    )
}

export default TourneyAccordion
