import SettingsIcon from "@mui/icons-material/Settings"
import {
    Box,
    AppBar as MuiAppBar,
    SvgIcon,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
} from "@mui/material"
import { ReactComponent as TwitchLogo } from "../../assets/TwitchLogo.svg"
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
        <Box flexGrow={1}>
            <MuiAppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Box
                        display="flex"
                        gap={10}
                    >
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
