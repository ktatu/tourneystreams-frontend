import { Box, Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material"

const cardData = {
    endDate: "25.09",
    game: "Dota 2",
    name: "Asian Games 2022",
    startDate: "20.09",
    liquipediaPage: "https://liquipedia.net/dota2/Asian_Games/2022",
    homePage: "https://google.com",
    additionalInfo: {
        eventType: "Online",
        tier: "Tier 1",
    },
}

const Match = () => {
    return (
        <Card>
            <CardContent>
                <Stack
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Box>
                        <Typography padding="5px">Counter-Strike</Typography>
                    </Box>
                    <Box
                        display="flex"
                        gap={1}
                        flexWrap="wrap"
                    >
                        <InfoTag
                            palette="primary"
                            text={cardData.additionalInfo.eventType}
                        />
                        <InfoTag
                            palette="primary"
                            text={cardData.additionalInfo.tier}
                        />
                    </Box>
                </Stack>
                <Typography
                    marginTop={2}
                    variant="h4"
                >
                    {cardData.name}
                </Typography>
                <Stack
                    paddingTop={1}
                    direction="row"
                    gap={1}
                    justifyContent="center"
                >
                    <Typography>{cardData.startDate}</Typography>
                    <Typography fontWeight={700}>{"  -  "}</Typography>
                    <Typography>{cardData.endDate}</Typography>
                </Stack>
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
            borderRadius={2}
            sx={{ userSelect: "none" }}
        >
            <Typography color={`${palette}.contrastText`}>{text}</Typography>
        </Box>
    )
}

export default Match
