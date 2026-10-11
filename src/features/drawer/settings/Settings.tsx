// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import { Box, Stack, Typography, TextField } from "@mui/material"
import DrawerContainer from "../shared_components/DrawerContainer"
import DrawerHeader from "../shared_components/DrawerHeader"
import CheckboxSetting from "./CheckboxSetting"
import UserSettings from "./UserSettings"
import { useState } from "react"

interface SettingsProps {
    handleDrawerClose: () => void
}

const Settings = ({ handleDrawerClose }: SettingsProps) => {
    const [maxStreams, setMaxStreams] = useState<number>(UserSettings.get("maxStreams"))

    const handleMaxStreamsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValAsInt = parseInt(event.target.value)
        if (isNaN(newValAsInt) || newValAsInt === 0 || newValAsInt > 9) {
            return
        }

        setMaxStreams(newValAsInt)
        UserSettings.save("maxStreams", event.target.value)
    }

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
                    <Stack spacing={2}>
                        <Typography variant="body1">
                            Changes require a page refresh to take effect
                        </Typography>
                        <Stack>
                            <Typography variant="h5">Twitch</Typography>
                            <CheckboxSetting
                                setting="autocloseEndedStreams"
                                settingDescription="Automatically close ended streams"
                            />
                            <CheckboxSetting
                                setting="hideStreamThumbnails"
                                settingDescription="Hide stream thumbnails"
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="h5">General</Typography>
                            <TextField
                                label="Max number of streams on screen"
                                sx={{ maxWidth: "50%" }}
                                type="number"
                                value={maxStreams}
                                variant="filled"
                                onChange={handleMaxStreamsChange}
                            />
                        </Stack>
                    </Stack>
                </Box>
            </>
        </DrawerContainer>
    )
}

export default Settings
