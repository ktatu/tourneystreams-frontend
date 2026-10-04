// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import { Stack, Typography } from "@mui/material"

type PlainText = { plainText: string }
type BulletPoint = { bulletPoint: string }
type DescriptionText = PlainText | BulletPoint

export interface GuideText {
    title: string
    description: Array<DescriptionText>
}

const TextDisplay = ({ text }: { text: GuideText }) => {
    return (
        <Stack
            spacing={0.5}
            sx={{
                flexWrap: "wrap"
            }}
        >
            <Typography variant="h3">{text.title}</Typography>
            {text.description.map((descr, index) => {
                if ("plainText" in descr) {
                    return (
                        <Typography
                            key={index}
                            variant="body1"
                        >
                            {descr.plainText}
                        </Typography>
                    )
                }
                return (
                    <ul
                        key={index}
                        style={{
                            // https://stackoverflow.com/questions/1461015/why-dont-ul-bullets-stay-within-their-containing-div
                            marginLeft: "1em",
                            textAlign: "left",
                        }}
                    >
                        <li key={index}>
                            <Typography
                                key={index}
                                variant="body1"
                            >
                                {descr.bulletPoint}
                            </Typography>
                        </li>
                    </ul>
                )
            })}
        </Stack>
    )
}

export default TextDisplay
