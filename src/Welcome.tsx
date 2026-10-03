import { Box, Button, Typography } from "@mui/material"
import { lazy, Suspense, useState } from "react"
import SiteGuideSkeleton from "./features/site_guide/SiteGuideSkeleton"

const SiteGuide = lazy(() => import("./features/site_guide/SiteGuide"))

const Welcome = () => {
    const [showSiteGuide, setShowSiteGuide] = useState(true)

    return (
        <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap={3}
            height="100%"
            paddingTop={5}
        >
            {!showSiteGuide && (
                <>
                    <Typography variant="h3">Welcome to Tourneystreams!</Typography>
                    <Typography variant="h5">
                        The site exists to make watching multiple streams convenient
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setShowSiteGuide(true)}
                    >
                        Show site guide
                    </Button>
                </>
            )}
            <Suspense fallback={<SiteGuideSkeleton />}>
                {showSiteGuide && <SiteGuide setShowSiteGuide={setShowSiteGuide} />}
            </Suspense>
        </Box>
    )
}

export default Welcome
