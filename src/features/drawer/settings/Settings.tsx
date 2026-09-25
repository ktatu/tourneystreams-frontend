import { Box, Button, Stack, Typography } from "@mui/material"
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
                    display="flex"
                    flexDirection="column"
                    gap={3}
                >
                    <Stack>
                        <Typography variant="h5">Twitch</Typography>
                        <CheckboxOption
                            optionName="autocloseEndedStreams"
                            optionDescription="Automatically close ended streams"
                        />
                        <CheckboxOption
                            optionName="hideStreamThumbnails"
                            optionDescription="Hide stream thumbnails"
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="h5">General</Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                        >
                            <Button variant="contained">Tutorial</Button>
                            <Typography>
                                Show the site tutorial. Clicking this will reload the page
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            </>
        </DrawerContainer>
    )
}

export default Settings
