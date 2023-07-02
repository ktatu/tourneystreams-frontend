import { Drawer as MuiDrawer } from "@mui/material"
import DrawerContent, { DrawerContentType } from "./DrawerContent"

interface TourneyDrawerProps {
    drawerContent: DrawerContentType
    handleDrawerClose: () => void
}

const Drawer = ({ drawerContent, handleDrawerClose }: TourneyDrawerProps) => {
    return (
        <MuiDrawer
            PaperProps={{
                sx: { width: "25vw", marginTop: (theme) => `${theme.mixins.toolbar.minHeight}px` },
            }}
            variant="persistent"
            open={drawerContent !== DrawerContentType.None}
            anchor="left"
        >
            <DrawerContent
                contentType={drawerContent}
                handleDrawerClose={handleDrawerClose}
            />
        </MuiDrawer>
    )
}

export default Drawer
