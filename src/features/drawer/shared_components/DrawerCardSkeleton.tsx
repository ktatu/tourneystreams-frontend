import { Skeleton, Stack } from "@mui/material"

const WIDTH = 350
const HEIGHT = 250

interface PlaceholderSkeletonProps {
    count: number
    gap: number
}

const DrawerCardSkeleton = ({ count, gap }: PlaceholderSkeletonProps) => {
    const skeletons = new Array(count).fill(
        <Skeleton
            height={HEIGHT}
            variant="rounded"
            width={WIDTH}
        />,
    )

    return (
        <Stack
            direction="column"
            sx={{
                gap: gap
            }}
        >
            {skeletons.map((skeleton, index) => (
                <div key={index}>{skeleton}</div>
            ))}
        </Stack>
    )
}

export default DrawerCardSkeleton
