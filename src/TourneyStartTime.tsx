import { Typography } from "@mui/material"

const TourneyStartTime = ({ startTimeAsDate }: { startTimeAsDate: Date }) => {
    if (Date.now() > startTimeAsDate.valueOf()) {
        return (
            <Typography
                color="red"
                variant="h6"
            >
                LIVE
            </Typography>
        )
    }

    return <Typography>{startTimeAsDate.toString()}</Typography>
}

export default TourneyStartTime
