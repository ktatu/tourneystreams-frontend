import TvIcon from "@mui/icons-material/Tv"
import { Box, CardMedia, Skeleton, Typography } from "@mui/material"
import round from "lodash.round"
import { useEffect, useState } from "react"

interface StreamCardThumbnailProps {
    streamName: string
    category: string
    viewerCount: number
}

const StreamCardThumbnail = ({ streamName, category, viewerCount }: StreamCardThumbnailProps) => {
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
                <ThumbnailOverLayInfo
                    category={category}
                    viewerCount={viewerCount}
                />
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
            <ThumbnailOverLayInfo
                category={category}
                viewerCount={viewerCount}
            />
        </>
    )
}

const ThumbnailOverLayInfo = ({
    category,
    viewerCount,
}: {
    category: string
    viewerCount: number
}) => {
    return (
        <>
            <Box
                bgcolor="rgba(0, 0, 0, 0.4)"
                left={0}
                padding={0.5}
                position="absolute"
                top={0}
            >
                <div style={{ opacity: 1, userSelect: "none" }}>{category}</div>
            </Box>
            <Box
                bgcolor="rgba(0, 0, 0, 0.4)"
                left={0}
                padding={0.5}
                position="absolute"
                top={180}
            >
                <div style={{ opacity: 1, userSelect: "none" }}>
                    {parseViewerCount(viewerCount)}
                </div>
            </Box>
        </>
    )
}

const parseViewerCount = (viewerCount: number) => {
    if (viewerCount < 1000) {
        return viewerCount + " viewers"
    }
    return round(viewerCount / 1000, 1) + "K viewers"
}

export default StreamCardThumbnail
