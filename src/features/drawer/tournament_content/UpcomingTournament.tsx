import { Box, Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material"

const cardData = {
    endDate: "25.09",
    game: "Dota 2",
    name: "Asian Games 2022",
    startDate: "20.09",
    liquipediaPage: "https://liquipedia.net/dota2/Asian_Games/2022",
    homePage: "https://google.com",
    additionalInfo: {
        eventType: "Online event",
        tier: "Tier 1",
    },
}

const UpcomingTournament = () => {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardContent>
                <Typography variant="h5">{cardData.name}</Typography>
                <Stack
                    paddingTop={1}
                    direction="row"
                    gap={1}
                >
                    <Typography>{cardData.startDate}</Typography>
                    <Typography fontWeight={700}>{"  -  "}</Typography>
                    <Typography>{cardData.endDate}</Typography>
                </Stack>
                <Box
                    display="flex"
                    gap={1}
                    flexWrap="wrap"
                >
                    <InfoTag
                        palette="dota2"
                        text={cardData.game}
                    />
                    <InfoTag
                        palette="primary"
                        text={cardData.additionalInfo.eventType}
                    />
                    <InfoTag
                        palette="primary"
                        text={cardData.additionalInfo.tier}
                    />
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    href={cardData.liquipediaPage}
                    target="_blank"
                >
                    Liquipedia
                </Button>
                <Button
                    href={cardData.homePage}
                    target="_blank"
                >
                    Homepage
                </Button>
            </CardActions>
        </Card>
    )
}

interface InfoTagProps {
    palette: string
    text: string
}

const InfoTag = ({ palette, text }: InfoTagProps) => {
    return (
        <Box
            width="fit-content"
            bgcolor={`${palette}.main`}
            padding="5px"
            marginTop={1}
            borderRadius={2}
            sx={{ userSelect: "none" }}
        >
            <Typography color={`${palette}.contrastText`}>{text}</Typography>
        </Box>
    )
}

export default UpcomingTournament
