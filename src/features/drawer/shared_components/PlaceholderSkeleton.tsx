import { Skeleton, Stack } from "@mui/material"

interface PlaceholderSkeletonProps {
    count: number
    width: number
    height: number
    gap: number
}

const PlaceholderSkeleton = ({ count, width, height, gap }: PlaceholderSkeletonProps) => {
    const skeletons = new Array(count).fill(
        <Skeleton
            height={height}
            variant="rounded"
            width={width}
        />
    )

    return (
        <Stack
            direction="column"
            gap={gap}
        >
            {skeletons.map((skeleton, index) => (
                <div key={index}>{skeleton}</div>
            ))}
        </Stack>
    )
}

export default PlaceholderSkeleton
