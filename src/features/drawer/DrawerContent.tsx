import TournamentContent from "./tournament_content"
import TwitchContent from "./twitch_content"

export enum DrawerContentType {
    TournamentContent,
    TwitchContent,
    None,
}

interface DrawerContentProps {
    contentType: DrawerContentType
    handleDrawerClose: () => void
}

const DrawerContent = ({ contentType, handleDrawerClose }: DrawerContentProps) => {
    switch (contentType) {
        case DrawerContentType.TournamentContent:
            return <TournamentContent handleDrawerClose={handleDrawerClose} />
        case DrawerContentType.TwitchContent:
            return <TwitchContent handleDrawerClose={handleDrawerClose} />
        default:
            return null
    }
}

export default DrawerContent
