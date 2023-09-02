import { memo } from "react"
import TournamentContent from "./tournament_content/TournamentContent"
import TwitchContent from "./twitch_content/TwitchContent"

export enum DrawerContentType {
    TournamentContent,
    TwitchContent,
    None,
}

interface DrawerContentSwitchProps {
    contentType: DrawerContentType
    handleDrawerClose: () => void
}

const DrawerContentSwitch = ({ contentType, handleDrawerClose }: DrawerContentSwitchProps) => {
    switch (contentType) {
        case DrawerContentType.TournamentContent:
            return <TournamentContent handleDrawerClose={handleDrawerClose} />
        case DrawerContentType.TwitchContent:
            return <TwitchContent handleDrawerClose={handleDrawerClose} />
        default:
            return null
    }
}

export default memo(DrawerContentSwitch)
