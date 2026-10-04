import { Divider, Skeleton as MuiSkeleton, Stack } from "@mui/material"

const Skeleton = () => {
    return (
        <Stack
            sx={{
                justifyContent: "center",
                paddingTop: 5
            }}>
            <Stack
                direction="row"
                spacing={5}
            >
                <MuiSkeleton
                    height={338}
                    variant="rectangular"
                    width={600}
                />
                <Divider
                    flexItem
                    orientation="vertical"
                />
                <Stack spacing={2}>
                    <MuiSkeleton variant="text" />
                    <MuiSkeleton
                        height={300}
                        variant="rectangular"
                        width={400}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Skeleton
