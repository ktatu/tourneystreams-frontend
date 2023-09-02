import HomeIcon from "@mui/icons-material/Home"
import SettingsIcon from "@mui/icons-material/Settings"
import { AccordionDetails, Box, IconButton, Link, Typography } from "@mui/material"
import Viewership from "../../shared_components/Viewership"
import { StreamInfo, WebLinks } from "../types"
import StreamInfoList from "./StreamInfoList"

interface TourneyAccordionDetailsProps {
    streamInfoArray: Array<StreamInfo>
    webLinks: WebLinks
}

const TourneyAccordionDetails = ({ streamInfoArray, webLinks }: TourneyAccordionDetailsProps) => {
    return (
        <AccordionDetails>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="row"
                    gap={1}
                >
                    <WebLinksWithIcons webLinks={webLinks} />
                    <Box
                        alignSelf="flex-end"
                        display="flex"
                        paddingLeft={6}
                    >
                        <Viewership viewerCount={1000} />
                    </Box>
                    <Typography
                        alignSelf="flex-end"
                        display="flex"
                        paddingLeft={3}
                        variant="h5"
                    >
                        A-Tier
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={0}
                >
                    <span>Official streams:</span>
                    <StreamInfoList streamInfoArray={streamInfoArray} />
                </Box>
            </Box>
        </AccordionDetails>
    )
}

const WebLinksWithIcons = ({ webLinks }: { webLinks: WebLinks }) => {
    const imageDimensions = { width: 32, height: 26 }

    return (
        <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
        >
            {webLinks.liquipedia ? (
                <Link
                    href={webLinks.liquipedia}
                    rel="noreferrer"
                    target="_blank"
                >
                    <IconButton>
                        <SettingsIcon sx={{ transform: "scale(1.5)" }} />
                    </IconButton>
                </Link>
            ) : null}
            {webLinks.twitter ? (
                <Link
                    href={webLinks.twitter}
                    rel="noreferrer"
                    target="_blank"
                >
                    <IconButton>
                        <img
                            src={require("../assets/twitter.png")}
                            style={imageDimensions}
                        />
                    </IconButton>
                </Link>
            ) : null}
            {webLinks.homePage ? (
                <Link
                    href={webLinks.homePage}
                    rel="noreferrer"
                    target="_blank"
                >
                    <IconButton>
                        <HomeIcon sx={{ transform: "scale(1.5)" }} />
                    </IconButton>
                </Link>
            ) : null}
        </Box>
    )
}

export default TourneyAccordionDetails
