import { Box, Button, Typography } from "@mui/material"
import { useStreamsState } from "./commons/streamsState"

const Welcome = () => {
    const { identifiers: streamIds } = useStreamsState()

    if (streamIds.length !== 0) {
        return null
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            paddingTop={9}
            justifyContent="center"
            alignItems="center"
            gap={3}
        >
            <Typography variant="h3">Welcome to Tourneystreams!</Typography>
            <Typography variant="h5">
                The site exists to make watching multiple streams convenient
            </Typography>
            <Button variant="contained">Show site guide</Button>
        </Box>
    )
}

export default Welcome
