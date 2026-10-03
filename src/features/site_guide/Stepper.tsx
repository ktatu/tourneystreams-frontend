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
            alignItems="center"
            spacing={5}
        >
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="center"
                spacing={5}
            >
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
