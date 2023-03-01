import { Box, Chip, Stack, Typography } from "@mui/material"

const ApexLegendsOptions = () => {
    const APEX_EVENT_REGIONS = ["International", "APAC-N", "APAC-S", "EMEA", "NA", "SA"]
    const APEX_TOURNAMENT_TIERS = ["S-Tier", "A-Tier", "B-Tier", "C-Tier", "D-Tier"]

    const handleChipChange = () => {
        console.log("chip click")
    }

    return (
        <Stack
            direction="column"
            gap={5}
        >
            <Stack
                direction="column"
                gap={1}
            >
                <Typography variant="h6">Regions</Typography>
                <Box
                    display="flex"
                    flexDirection="row"
                    gap={1}
                >
                    {APEX_EVENT_REGIONS.map((region) => (
                        <Chip
                            key={region}
                            label={region}
                            onClick={handleChipChange}
                        />
                    ))}
                </Box>
            </Stack>
            <Stack
                direction="column"
                gap={1}
            >
                <Typography variant="h6">Tournament tiers</Typography>
                <span>
                    Tournaments featured on Liquipedia are ranked based on factors such as level of
                    competition and prize pool
                </span>
                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    gap={1}
                >
                    {APEX_TOURNAMENT_TIERS.map((tier) => (
                        <Chip
                            key={tier}
                            label={tier}
                            onClick={handleChipChange}
                        />
                    ))}
                </Box>
            </Stack>
        </Stack>
    )
}

export default ApexLegendsOptions
