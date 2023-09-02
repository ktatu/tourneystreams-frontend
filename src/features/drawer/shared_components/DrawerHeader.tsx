import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CloseIcon from "@mui/icons-material/Close"
import SettingsIcon from "@mui/icons-material/Settings"
import { Box, IconButton, Stack, Typography } from "@mui/material"
import "../Drawer.css"

interface DrawerHeaderProps {
    title: string
    handleDrawerClose: () => void
    handleSettingsView: () => void
    settingsViewOpen: boolean
}
const DrawerHeader = ({
    title,
    handleDrawerClose,
    handleSettingsView,
    settingsViewOpen,
}: DrawerHeaderProps) => {
    return (
        <Stack
            direction="column"
            gap={4}
            paddingBottom={5}
        >
            <Box
                alignContent="center"
                display="flex"
            >
                <Typography variant="h4">{title}</Typography>
                <Box
                    display="flex"
                    gap={1}
                    marginLeft="auto"
                >
                    <IconButton onClick={handleSettingsView}>
                        {settingsViewOpen ? (
                            <CloseIcon fontSize="large" />
                        ) : (
                            <SettingsIcon fontSize="large" />
                        )}
                    </IconButton>
                    <IconButton onClick={handleDrawerClose}>
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Box>
        </Stack>
    )
}

export default DrawerHeader
