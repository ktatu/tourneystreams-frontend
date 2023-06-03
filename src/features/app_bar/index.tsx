import { AppBar as MuiAppBar, Box, Toolbar, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ChatControls from "./ChatControls"
import StreamControls from "./StreamControls"

interface AppBarProps {
    handleTourneyDrawerOpen: () => void
}

const AppBar = ({ handleTourneyDrawerOpen }: AppBarProps) => {
    return (
        <Box flexGrow={1}>
            <MuiAppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Box
                        display="flex"
                        marginRight="auto"
                        gap={10}
                    >
                        <IconButton onClick={handleTourneyDrawerOpen}>
                            <MenuIcon fontSize="large" />
                        </IconButton>
                        <Box>
                            <StreamControls />
                        </Box>
                    </Box>
                    <ChatControls />
                </Toolbar>
            </MuiAppBar>
        </Box>
    )
}

export default AppBar
