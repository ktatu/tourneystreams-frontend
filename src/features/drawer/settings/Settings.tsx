// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import { Box, Stack, Typography } from "@mui/material"
import DrawerContainer from "../shared_components/DrawerContainer"
import DrawerHeader from "../shared_components/DrawerHeader"
import CheckboxOption from "./CheckboxOption"

interface SettingsProps {
    handleDrawerClose: () => void
}

const Settings = ({ handleDrawerClose }: SettingsProps) => {
    return (
        <DrawerContainer>
            <>
                <DrawerHeader
                    handleDrawerClose={handleDrawerClose}
                    title="Settings"
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    <Stack>
                        <Typography variant="h5">Twitch</Typography>
                        <CheckboxOption
                            optionDescription="Automatically close ended streams"
                            optionName="autocloseEndedStreams"
                        />
                        <CheckboxOption
                            optionDescription="Hide stream thumbnails"
                            optionName="hideStreamThumbnails"
                        />
                    </Stack>
                </Box>
            </>
        </DrawerContainer>
    )
}

export default Settings
