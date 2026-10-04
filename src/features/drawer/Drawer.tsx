import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { Box, Fab, Fade, Drawer as MuiDrawer, useScrollTrigger, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import DrawerContentSwitch, { DrawerContent } from "./DrawerContentSwitch"

interface TourneyDrawerProps {
    drawerContent: DrawerContent
    drawerWidth: string
    handleDrawerClose: () => void
}

const Drawer = ({ drawerContent, drawerWidth, handleDrawerClose }: TourneyDrawerProps) => {
    const [scrollTarget, setScrollTarget] = useState<undefined | Node>(undefined)

    useEffect(() => {
        setScrollTarget(document.getElementById("scroll-container") as Node)
    }, [])

    const theme = useTheme()

    const handleScrollToTop = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
            "#scroll-to-top-anchor",
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
            open={drawerContent !== DrawerContent.None}
            variant="persistent"
            slotProps={{
                paper: {
                    sx: {
                        width: drawerWidth,
                        height: "100%",
                        paddingTop: `${drawerPaddingTop}px`,
                    },
                },
            }}
        >
            <Box
                id="scroll-container"
                sx={{
                    height: "100%",
                    overflow: "auto"
                }}>
                <Box id="scroll-to-top-anchor" />
                <DrawerContentSwitch
                    contentType={drawerContent}
                    handleDrawerClose={handleDrawerClose}
                />
                <Fade in={scrollTrigger}>
                    <Box
                        sx={{
                            bottom: "5vh",
                            height: "50px",
                            left: `calc(${drawerWidth} - 5vw)`,
                            position: "fixed",
                            width: "50px"
                        }}
                        onClick={handleScrollToTop}>
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
