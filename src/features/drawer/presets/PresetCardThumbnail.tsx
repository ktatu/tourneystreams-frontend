// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): replaced JSX.Element with React.JSX.Element, moved MUI system props into sx, as part of the Vite/dependency migration.
import TvIcon from "@mui/icons-material/Tv"
import { Box, CardMedia, Skeleton, Typography } from "@mui/material"
import { useEffect, useState } from "react"

interface PresetCardThumbnailProps {
    thumbnailWidth: number
    streamName: string
    overlay: React.JSX.Element
}

const PresetCardThumbnail = ({ thumbnailWidth, streamName, overlay }: PresetCardThumbnailProps) => {
    const [thumbnailLoaded, setThumbnailLoaded] = useState(false)
    const [thumbnailLoadError, setThumbnailLoadError] = useState(false)

    const THUMBNAIL_HEIGHT = 210

    const thumbnailUrl = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamName}-${thumbnailWidth}x${THUMBNAIL_HEIGHT}.jpg`

    useEffect(() => {
        setThumbnailLoaded(false)
        const image = new Image()
        image.src = thumbnailUrl
        image.onload = () => setThumbnailLoaded(true)
        image.onerror = () => setThumbnailLoadError(true)
    }, [thumbnailUrl])

    if (thumbnailLoadError) {
        return (
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    gap: 0.5,
                    height: THUMBNAIL_HEIGHT,
                    justifyContent: "center",
                    width: thumbnailWidth
                }}>
                <TvIcon fontSize="large" />
                <Typography
                    sx={{ userSelect: "none" }}
                    variant="h5"
                >
                    Failed to load thumbnail
                </Typography>
                {overlay}
            </Box>
        )
    }

    return (
        <>
            {thumbnailLoaded ? (
                <CardMedia
                    image={thumbnailUrl}
                    sx={{ width: thumbnailWidth, height: THUMBNAIL_HEIGHT }}
                />
            ) : (
                <Skeleton
                    animation="wave"
                    height={THUMBNAIL_HEIGHT}
                    variant="rectangular"
                    width={thumbnailWidth}
                />
            )}
            {overlay}
        </>
    )
}

export default PresetCardThumbnail
