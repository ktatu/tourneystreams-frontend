import TvIcon from "@mui/icons-material/Tv"
import { Box, CardMedia, Skeleton, Typography } from "@mui/material"
import { useEffect, useState } from "react"

const StreamCardThumbnail = ({ streamName }: { streamName: string }) => {
    const [thumbnailLoaded, setThumbnailLoaded] = useState(false)
    const [thumbnailLoadError, setThumbnailLoadError] = useState(false)

    const THUMBNAIL_WIDTH = 350
    const THUMBNAIL_HEIGHT = 210

    const thumbnailUrl = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamName}-${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}.jpg`

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
                width={THUMBNAIL_WIDTH}
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
            </Box>
        )
    }

    return (
        <>
            {thumbnailLoaded ? (
                <CardMedia
                    image={thumbnailUrl}
                    sx={{ width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT }}
                />
            ) : (
                <Skeleton
                    animation="wave"
                    height={THUMBNAIL_HEIGHT}
                    variant="rectangular"
                    width={THUMBNAIL_WIDTH}
                />
            )}
        </>
    )
}

export default StreamCardThumbnail
