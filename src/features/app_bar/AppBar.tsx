// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): changed the SVG import to the ?react form, moved MUI system props into sx, as part of the Vite/dependency migration.
import SettingsIcon from "@mui/icons-material/Settings"
import {
    Box,
    AppBar as MuiAppBar,
    SvgIcon,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
} from "@mui/material"
import TwitchLogo from "../../assets/TwitchLogo.svg?react"
import { DrawerContent } from "../drawer/DrawerContentSwitch"
import StreamSection from "./StreamSection"

interface AppBarProps {
    drawerContentType: DrawerContent
    setDrawerContentType: (drawerContentType: DrawerContent) => void
}

const AppBar = ({ drawerContentType, setDrawerContentType }: AppBarProps) => {
    const handleToggleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newToggleValue: DrawerContent,
    ) => {
        if (newToggleValue === null) {
            setDrawerContentType(DrawerContent.None)
        } else {
            setDrawerContentType(newToggleValue)
        }
    }

    return (
        <Box sx={{
            flexGrow: 1
        }}>
            <MuiAppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    minHeight: (theme) => theme.mixins.toolbar.minHeight,
                }}
            >
                <Toolbar>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 10
                        }}>
                        <ToggleButtonGroup
                            exclusive
                            value={drawerContentType}
                            onChange={handleToggleChange}
                        >
                            <ToggleButton value={DrawerContent.Settings}>
                                <SvgIcon>
                                    <SettingsIcon fontSize="large" />
                                </SvgIcon>
                            </ToggleButton>
                            <ToggleButton value={DrawerContent.FollowedStreams}>
                                <SvgIcon sx={{ marginRight: 1 }}>
                                    <TwitchLogo />
                                </SvgIcon>
                                Followed
                            </ToggleButton>
                            <ToggleButton value={DrawerContent.Presets}>
                                {" "}
                                <SvgIcon sx={{ marginRight: 1 }}>
                                    <TwitchLogo />
                                </SvgIcon>
                                Presets
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <StreamSection />
                    </Box>
                </Toolbar>
            </MuiAppBar>
        </Box>
    )
}

export default AppBar
