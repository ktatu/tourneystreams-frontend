import { Box, Typography } from "@mui/material"

const WelcomeContent = () => {
    return (
        <Box
            paddingLeft={10}
            paddingTop={9}
        >
            <Typography variant="h3">Welcome to Tourneystreams!</Typography>
            <Typography
                paddingTop={5}
                variant="h6"
            >
                Upcoming next:
            </Typography>
            <Typography variant="body1">
                Not seeing what you&apos;re looking for? Check the filter options on top-left
            </Typography>
        </Box>
    )
}

export default WelcomeContent
