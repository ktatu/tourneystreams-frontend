import { Drawer as MuiDrawer } from "@mui/material"
import DrawerContent, { DrawerContentType } from "./DrawerContent"

interface TourneyDrawerProps {
    drawerContent: DrawerContentType
}

const Drawer = ({ drawerContent }: TourneyDrawerProps) => {
    //console.log("drawer content ", drawerContent)

    return (
        <MuiDrawer
            PaperProps={{
                sx: { width: "25vw", marginTop: (theme) => `${theme.mixins.toolbar.minHeight}px` },
            }}
            variant="persistent"
            open={drawerContent !== DrawerContentType.None}
            anchor="left"
        >
            <DrawerContent contentType={drawerContent} />
        </MuiDrawer>
    )
}

export default Drawer
