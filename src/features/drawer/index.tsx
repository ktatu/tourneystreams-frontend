import { Box, Drawer as MuiDrawer, Fab, Fade, useScrollTrigger } from "@mui/material"
import DrawerContent, { DrawerContentType } from "./DrawerContent"
import { useEffect, useState } from "react"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

interface TourneyDrawerProps {
    drawerContent: DrawerContentType
    handleDrawerClose: () => void
}

const Drawer = ({ drawerContent, handleDrawerClose }: TourneyDrawerProps) => {
    const [scrollTarget, setScrollTarget] = useState<undefined | Node>(undefined)

    const handleScrollToTop = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
            "#scroll-to-top-anchor"
        )

        if (anchor) {
            anchor.scrollIntoView({
                block: "center",
                behavior: "auto",
            })
        }
    }

    useEffect(() => {
        setScrollTarget(document.getElementById("drawer-surface") as Node)
    }, [])

    const scrollTrigger = useScrollTrigger({
        threshold: 1000,
        disableHysteresis: true,
        target: scrollTarget,
    })

    return (
        <MuiDrawer
            PaperProps={{
                sx: {
                    width: "25vw",
                    paddingTop: (theme) => `${theme.mixins.toolbar.minHeight}px`,
                },
                id: "drawer-surface",
            }}
            variant="persistent"
            open={drawerContent !== DrawerContentType.None}
            anchor="left"
        >
            <Box id="scroll-to-top-anchor" />
            <DrawerContent
                contentType={drawerContent}
                handleDrawerClose={handleDrawerClose}
            />
            <Fade in={scrollTrigger}>
                <Box
                    position="fixed"
                    bottom="5vh"
                    left="20vw"
                    width="50px"
                    height="50px"
                    onClick={handleScrollToTop}
                >
                    <Fab color="primary">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </Box>
            </Fade>
        </MuiDrawer>
    )
}

export default Drawer
