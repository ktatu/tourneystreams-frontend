import TournamentContent from "./tournament_content"
import TwitchContent from "./twitch_content"

export enum DrawerContentType {
    TournamentContent,
    TwitchContent,
    None,
}

interface DrawerContentProps {
    contentType: DrawerContentType
}

const DrawerContent = ({ contentType }: DrawerContentProps) => {
    switch (contentType) {
        case DrawerContentType.TournamentContent:
            return <TournamentContent />
        case DrawerContentType.TwitchContent:
            return <TwitchContent />
        default:
            return null
    }
}

export default DrawerContent
