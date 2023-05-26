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
                sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}
            >
                <Toolbar>
                    <IconButton onClick={handleTourneyDrawerOpen}>
                        <MenuIcon fontSize="large" />
                    </IconButton>
                    <Box
                        marginLeft="24%"
                        paddingRight={10}
                    >
                        <StreamControls />
                    </Box>
                    <Box flexGrow={1} />
                    <ChatControls />
                </Toolbar>
            </MuiAppBar>
        </Box>
    )
}

export default AppBar
