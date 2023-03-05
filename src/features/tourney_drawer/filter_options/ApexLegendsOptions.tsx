import { Box, Chip, Stack, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import InfoIcon from "@mui/icons-material/Info"
import { FilterOptionHeader } from "./FilterOptions"

const APEX_EVENT_REGIONS = ["International", "APAC-N", "APAC-S", "EMEA", "NA", "SA"]
const APEX_TOURNAMENT_TIERS = ["S-Tier", "A-Tier", "B-Tier", "C-Tier", "D-Tier"]

const ApexLegendsOptions = () => {
    const [selectedRegions, setSelectedRegions] = useState(["International", "APAC-N", "APAC-S"])

    // TODO: useEffect for setting initial values based on saved user options fetched from localStorage

    const handleRegionChange = (changedValue: string) => {
        if (selectedRegions.includes(changedValue)) {
            setSelectedRegions(selectedRegions.filter((region) => region !== changedValue))
        } else {
            setSelectedRegions(selectedRegions.concat(changedValue))
        }
    }

    const handleTierChange = () => {
        console.log("tier change")
    }

    return (
        <Stack
            direction="column"
            gap={8}
        >
            <Stack
                direction="column"
                gap={1}
            >
                <FilterOptionHeader optionTitle="Regions" />
                <Box
                    display="flex"
                    flexDirection="row"
                    gap={1}
                >
                    {APEX_EVENT_REGIONS.map((region) => (
                        <Chip
                            color={selectedRegions.includes(region) ? "primary" : "default"}
                            key={region}
                            label={region}
                            onClick={() => handleRegionChange(region)}
                            variant="filled"
                        />
                    ))}
                </Box>
            </Stack>
            <Stack
                direction="column"
                gap={1}
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
                    {APEX_TOURNAMENT_TIERS.map((tier) => (
                        <Chip
                            key={tier}
                            label={tier}
                            onClick={handleTierChange}
                        />
                    ))}
                </Box>
            </Stack>
        </Stack>
    )
}

export default ApexLegendsOptions
