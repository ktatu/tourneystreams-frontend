import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material"

const cardData = {
    endDate: "25.09",
    game: "Dota 2",
    name: "Asian Games 2022",
    startDate: "20.09",
}

const UpcomingTournament = () => {
    return (
        <Card sx={{ width: 300 }}>
            <CardContent>
                <Typography color="text.secondary">{cardData.game}</Typography>
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
            </CardContent>
            <CardActions>
                <Button>Liquipedia</Button>
                <Button>Homepage</Button>
            </CardActions>
        </Card>
    )
}

export default UpcomingTournament
