// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { Button, Stack, Typography } from "@mui/material"

interface StepperProps {
    currentStep: number
    totalSteps: number
    setGuideStep: React.Dispatch<React.SetStateAction<number>>
    setShowSiteGuide: React.Dispatch<React.SetStateAction<boolean>>
}

const GuideStepper = ({
    currentStep,
    totalSteps,
    setGuideStep,
    setShowSiteGuide,
}: StepperProps) => {
    return (
        <Stack
            spacing={5}
            sx={{
                alignItems: "center"
            }}
        >
            <Stack
                direction="row"
                spacing={5}
                sx={{
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <Button
                    disabled={currentStep === 0}
                    size="large"
                    variant="outlined"
                    onClick={() => setGuideStep(currentStep - 1)}
                >
                    <KeyboardArrowLeft />
                    Back
                </Button>
                <Typography variant="h5">
                    {currentStep + 1}/{totalSteps}
                </Typography>
                <Button
                    disabled={currentStep === totalSteps - 1}
                    size="large"
                    variant="outlined"
                    onClick={() => setGuideStep(currentStep + 1)}
                >
                    Next
                    <KeyboardArrowRight />
                </Button>
            </Stack>
            <Button
                variant="contained"
                onClick={() => setShowSiteGuide(false)}
            >
                Exit
            </Button>
        </Stack>
    )
}

export default GuideStepper
