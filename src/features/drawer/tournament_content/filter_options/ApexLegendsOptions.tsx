import { Box, Chip, Stack } from "@mui/material"
import { FilterOptionHeader } from "./FilterOptions"
import useFilterOptions from "./useFilterOptions"

const APEX_EVENT_REGIONS = ["International", "APAC-N", "APAC-S", "EMEA", "NA", "SA"]
const APEX_EVENT_REGIONS_DEFAULTS = ["International", "APAC-N", "APAC-S", "EMEA", "NA", "SA"]

const APEXLEGENDS_TOURNAMENT_TIERS = ["S-Tier", "A-Tier", "B-Tier", "C-Tier", "D-Tier"]
const APEXLEGENDS_TOURNAMENTS_TIERS_DEFAULTS = ["S-Tier", "A-Tier", "B-Tier"]

const ApexLegendsOptions = () => {
    const regions = useFilterOptions("apexlegendsRegions", APEX_EVENT_REGIONS_DEFAULTS)
    const tournamentTiers = useFilterOptions(
        "apexlegendsTournamentTiers",
        APEXLEGENDS_TOURNAMENTS_TIERS_DEFAULTS
    )

    return (
        <Stack
            direction="column"
            gap={8}
        >
            <Stack
                direction="column"
                gap={2}
            >
                <FilterOptionHeader optionTitle="Regions" />
                <Box
                    display="flex"
                    flexDirection="row"
                    gap={1}
                >
                    {APEX_EVENT_REGIONS.map((region) => (
                        <Chip
                            key={region}
                            color={regions.getAll().includes(region) ? "primary" : "default"}
                            label={region}
                            variant="filled"
                            onClick={() => regions.handleChange(region)}
                        />
                    ))}
                </Box>
            </Stack>
            <Stack
                direction="column"
                gap={2}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                >
                    <FilterOptionHeader
                        optionTitle="Tournament tiers"
                        tooltipText="Tournaments on Liquipedia are ranked based on factors such as level of competition and prize pool"
                    />
                </Box>
                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    gap={1}
                >
                    {APEXLEGENDS_TOURNAMENT_TIERS.map((tier) => (
                        <Chip
                            key={tier}
                            color={tournamentTiers.getAll().includes(tier) ? "primary" : "default"}
                            label={tier}
                            onClick={() => tournamentTiers.handleChange(tier)}
                        />
                    ))}
                </Box>
            </Stack>
        </Stack>
    )
}

export default ApexLegendsOptions
