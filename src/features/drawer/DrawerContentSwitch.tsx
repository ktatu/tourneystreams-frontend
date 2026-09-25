import { memo } from "react"
import FollowedStreams from "./followed_streams/FollowedStreams"
import Presets from "./presets/Presets"
import Settings from "./settings/Settings"

export enum DrawerContent {
    Settings,
    FollowedStreams,
    Presets,
    None,
}

interface DrawerContentSwitchProps {
    contentType: DrawerContent
    handleDrawerClose: () => void
}

const DrawerContentSwitch = ({ contentType, handleDrawerClose }: DrawerContentSwitchProps) => {
    switch (contentType) {
        case DrawerContent.Settings:
            return <Settings handleDrawerClose={handleDrawerClose} />
        case DrawerContent.FollowedStreams:
            return <FollowedStreams handleDrawerClose={handleDrawerClose} />
        case DrawerContent.Presets:
            return <Presets handleDrawerClose={handleDrawerClose} />
        default:
            return null
    }
}

export default memo(DrawerContentSwitch)
