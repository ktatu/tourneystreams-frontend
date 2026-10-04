// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import { Divider, Stack } from "@mui/material"
import { useState } from "react"
import ReactPlayer from "react-player"
import step1AddStreams from "../../assets/siteguide_videos/step1_addstreams.mp4"
import step2FollowedStreams from "../../assets/siteguide_videos/step2_followed.mp4"
import step3Presets from "../../assets/siteguide_videos/step3_presets.mp4"
import GuideStepper from "./Stepper"
import TextDisplay, { GuideText } from "./TextDisplay"

const videoPaths: Array<string> = [step1AddStreams, step2FollowedStreams, step3Presets]

const steps: Array<GuideText> = [
    {
        title: "Add streams",
        description: [
            {
                plainText: "Twitch and YouTube streams can be added directly from the app bar",
            },
            { bulletPoint: "For Twitch streams, enter the channel name" },
            { bulletPoint: "For YouTube streams, use the stream url" },
        ],
    },
    {
        title: "Followed streams",
        description: [
            {
                plainText:
                    "Livestreams from channels you follow on Twitch are shown in the Followed tab",
            },
        ],
    },
    {
        title: "Presets",
        description: [
            {
                plainText:
                    "Presets let you create groups of channels, making it easy to open multiple streams",
            },
        ],
    },
]

interface SiteGuideProps {
    setShowSiteGuide: React.Dispatch<React.SetStateAction<boolean>>
}

const SiteGuide = ({ setShowSiteGuide }: SiteGuideProps) => {
    const [guideStep, setGuideStep] = useState(0)

    return (
        <Stack
            spacing={10}
            sx={{
                justifyContent: "center",
                paddingTop: 5
            }}>
            <Stack
                direction="row"
                spacing={5}
            >
                <Video url={videoPaths[guideStep]} />
                <Divider
                    flexItem
                    orientation="vertical"
                />
                <TextDisplay text={steps[guideStep]} />
            </Stack>
            <GuideStepper
                currentStep={guideStep}
                setGuideStep={setGuideStep}
                setShowSiteGuide={setShowSiteGuide}
                totalSteps={steps.length}
            />
        </Stack>
    )
}

const Video = ({ url }: { url: string }) => {
    return (
        <ReactPlayer
            controls={false}
            height={338}
            loop={true}
            muted={true}
            playing={true}
            url={url}
            width={600}
        />
    )
}

export default SiteGuide
