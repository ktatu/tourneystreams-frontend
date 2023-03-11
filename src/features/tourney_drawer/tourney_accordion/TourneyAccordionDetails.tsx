import { AccordionDetails, Box, Skeleton, Stack, Tooltip, Typography } from "@mui/material"
import axios from "axios"
import { useQuery } from "react-query"
import { StreamInfo, WebLink } from "../types"
import HomeIcon from "@mui/icons-material/Home"
import BoyIcon from "@mui/icons-material/Boy"
import AccordionStreamInfo from "./AccordionStreamInfo"

interface TourneyAccordionDetailsProps {
    streams: Array<StreamInfo>
    webLinks: Array<WebLink>
}

const TourneyAccordionDetails = ({ streams, webLinks }: TourneyAccordionDetailsProps) => {
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
                                src={require("../assets/liquipedia.png")}
                                width={32}
                                height={26}
                            />
                        </Box>
                        <Box paddingRight="10px">
                            <img
                                src={require("../assets/twitter.png")}
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
                    <span>Streams:</span>
                    {streams.map((stream) => (
                        <AccordionStreamInfo
                            key={stream.channel}
                            streamInfo={stream}
                        />
                    ))}
                </Box>
            </Box>
        </AccordionDetails>
    )
}

export default TourneyAccordionDetails
