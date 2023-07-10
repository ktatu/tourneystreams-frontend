import { Box, Drawer as MuiDrawer, Fab, Fade, useScrollTrigger, useTheme } from "@mui/material"
import DrawerContent, { DrawerContentType } from "./DrawerContent"
import { useEffect, useState } from "react"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

interface TourneyDrawerProps {
    drawerContent: DrawerContentType
    handleDrawerClose: () => void
}

const Drawer = ({ drawerContent, handleDrawerClose }: TourneyDrawerProps) => {
    const [scrollTarget, setScrollTarget] = useState<undefined | Node>(undefined)

    useEffect(() => {
        const element = document.getElementById("scroll-container")
        if (!element) {
            return
        }

        console.log("scroll target ", element)
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
        threshold: 100,
        disableHysteresis: true,
        target: scrollTarget,
    })

    let drawerMarginTop = theme.mixins.toolbar.minHeight
    if (drawerMarginTop && typeof drawerMarginTop === "number") {
        drawerMarginTop += 5
    }

    return (
        <MuiDrawer
            PaperProps={{
                sx: {
                    width: "25vw",
                    height: "100%",
                    paddingTop: `${drawerMarginTop}px`,
                },
            }}
            variant="persistent"
            open={drawerContent !== DrawerContentType.None}
            anchor="left"
        >
            <Box
                overflow="auto"
                id="scroll-container"
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
            </Box>
        </MuiDrawer>
    )
}

export default Drawer
