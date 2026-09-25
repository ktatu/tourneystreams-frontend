import TvIcon from "@mui/icons-material/Tv"
import { Box, CardMedia, Skeleton, Typography } from "@mui/material"
import { useEffect, useState } from "react"

interface StreamCardThumbnailProps {
    streamName: string
    overlay: JSX.Element
    thumbnailWidth: number
}

const StreamCardThumbnail = ({ streamName, thumbnailWidth, overlay }: StreamCardThumbnailProps) => {
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
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={thumbnailWidth}
                height={THUMBNAIL_HEIGHT}
                gap={0.5}
            >
                <TvIcon fontSize="large" />
                <Typography
                    variant="h5"
                    sx={{ userSelect: "none" }}
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

export default StreamCardThumbnail
