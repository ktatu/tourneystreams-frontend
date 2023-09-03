import LaunchIcon from "@mui/icons-material/Launch"
import { Button } from "@mui/material"

interface ExternalLinkButtonProps {
    href: string
    text: string
}

const ExternalLinkButton = ({ href, text }: ExternalLinkButtonProps) => {
    return (
        <Button
            endIcon={<LaunchIcon />}
            href={href}
            sx={{ borderWidth: "2px" }}
            variant="outlined"
        >
            {text}
        </Button>
    )
}

export default ExternalLinkButton
