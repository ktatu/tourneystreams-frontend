import { Box, Drawer as MuiDrawer, Fab, Fade, useScrollTrigger, useTheme } from "@mui/material"
import DrawerContentSwitch, { DrawerContentType } from "./DrawerContentSwitch"
import { useEffect, useState } from "react"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

interface TourneyDrawerProps {
    drawerContent: DrawerContentType
    handleDrawerClose: () => void
}

const Drawer = ({ drawerContent, handleDrawerClose }: TourneyDrawerProps) => {
    const [scrollTarget, setScrollTarget] = useState<undefined | Node>(undefined)

    useEffect(() => {
        setScrollTarget(document.getElementById("scroll-container") as Node)
    }, [])

    const theme = useTheme()

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

    const scrollTrigger = useScrollTrigger({
        threshold: 500,
        disableHysteresis: true,
        target: scrollTarget,
    })

    let drawerPaddingTop = theme.mixins.toolbar.minHeight
    if (drawerPaddingTop && typeof drawerPaddingTop === "number") {
        drawerPaddingTop += 5
    }

    return (
        <MuiDrawer
            anchor="left"
            open={drawerContent !== DrawerContentType.None}
            variant="persistent"
            PaperProps={{
                sx: {
                    width: "25vw",
                    height: "100%",
                    paddingTop: `${drawerPaddingTop}px`,
                },
            }}
        >
            <Box
                height="100%"
                id="scroll-container"
                overflow="auto"
            >
                <Box id="scroll-to-top-anchor" />
                <DrawerContentSwitch
                    contentType={drawerContent}
                    handleDrawerClose={handleDrawerClose}
                />
                <Fade in={scrollTrigger}>
                    <Box
                        bottom="5vh"
                        height="50px"
                        left="20vw"
                        position="fixed"
                        width="50px"
                        onClick={handleScrollToTop}
                    >
                        <Fab color="primary">
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </Box>
                </Fade>
            </Box>
        </MuiDrawer>
    )
}

export default Drawer
