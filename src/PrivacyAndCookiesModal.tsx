import CloseIcon from "@mui/icons-material/Close"
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    Stack,
    Typography,
} from "@mui/material"
import { useEffect, useState } from "react"

import CookiesConsent, { useCookiesConsent } from "./CookiesConsent"

const dialogText: Array<{ header: string; text: string[] }> = [
    {
        header: "Handling of personal data",
        text: [
            "What we store: your Twitch user ID and the authentication tokens Twitch provides when you connect your account.",
            "Why: Tourneystreams uses server Twitch-provided tokens to make authenticated requests to Twitch on your behalf. Twitch-related functionalities that require communication with Twitch servers (e.g. showing the list of followed streams) cannot be performed without these tokens.",
            "Legal basis: legitimate interest in letting you use site functionalities which rely on communicating with Twitch servers. Tourneystreams server stores only data required for these functionalities.",
            "Retention: the data is deleted 10 days after your last action that required authentication. Every action that requires authentication refreshes this 10-day duration.",
            "Recipients: Tourneystreams uses Render to host its backend and Redis Cloud to host its database, both in Germany. These providers host the service and database used to process your Twitch user ID and tokens.",
            "Providing data is voluntary. You can still watch streams (if required cookies are consented to, see below), but functionalities that depend on Twitch will be unavailable.",
        ],
    },
    {
        header: "Cookies",
        text: [
            "Two secure, strictly necessary cookies are used. One is used once during Twitch authorization process, in order to enhance security. The other authenticates you with Tourneystreams server. It expires after 10 days.",
            "Watching streams requires allowing cookies from Twitch and / or YouTube. These services set their own cookies and process your data according to their own privacy policies.",
            "Tourneystreams does not use analytics or advertising cookies. Your cookie choices are stored in your browser's local storage until you clear it.",
        ],
    },
    {
        header: "Transfers outside the EEA and automated decisions",
        text: [
            "Tourneystreams does not transfer your data outside the EEA, nor is it used for profiling or automated decision-making. Information regarding Twitch's and YouTube's policies on these should be read from their respective privacy notices.",
        ],
    },
    {
        header: "Your rights",
        text: [
            "You have the right to access, correct, or erase your personal data, restrict or object to its processing, and receive data you provided. You may contact the email below regarding these rights.",
            "A complaint can be filed to the Finnish Office of the Data Protection Ombudsman (tietosuoja.fi).",
        ],
    },
    {
        header: "Who is responsible for your data",
        text: [
            "Tatu Kaikkonen, a private individual, is the controller of your data. Contact: kaikkonentatu (at) gmail.com",
        ],
    },
    {
        header: "Changes",
        text: [
            "This policy will be updated when data processing, tools or providers change. Last updated: 6.10.2026.",
        ],
    },
]

interface PrivacyAndCookiesModalProps {
    open: boolean
    onClose: () => void
}

const PrivacyAndCookiesModal = ({ open, onClose }: PrivacyAndCookiesModalProps) => {
    const twitchChoice = useCookiesConsent("twitch")
    const youtubeChoice = useCookiesConsent("youtube")
    const [twitchCookieChoice, setTwitchCookieChoice] = useState(twitchChoice === "accept")
    const [setYoutubeChoice, setYoutubeCookieChoice] = useState(youtubeChoice === "accept")

    useEffect(() => {
        if (open) {
            setTwitchCookieChoice(twitchChoice === "accept")
            setYoutubeCookieChoice(youtubeChoice === "accept")
        }
    }, [open, twitchChoice, youtubeChoice])

    const handleClose = () => {
        onClose()
    }

    const handleSave = () => {
        CookiesConsent.set("twitch", twitchCookieChoice ? "accept" : "reject")
        CookiesConsent.set("youtube", setYoutubeChoice ? "accept" : "reject")
        CookiesConsent.set("essential", "accept")
        onClose()
    }

    return (
        <Dialog
            open={open}
            scroll="body"
            onClose={handleClose}
        >
            <DialogTitle>Privacy and Cookies</DialogTitle>
            <IconButton
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                }}
                onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                {dialogText.map((text, index) => (
                    <Stack
                        key={index}
                        sx={{ marginBottom: 2 }}
                    >
                        <Typography
                            gutterBottom
                            variant="h6"
                        >
                            {text.header}
                        </Typography>
                        {text.text.map((paragraph, paragraphIndex) => (
                            <Typography
                                key={paragraphIndex}
                                gutterBottom
                                variant="body1"
                            >
                                {paragraph}
                            </Typography>
                        ))}
                    </Stack>
                ))}
                <Typography
                    gutterBottom
                    variant="h6"
                >
                    Manage optional cookies
                </Typography>
                <Stack>
                    <FormControlLabel
                        label="Twitch"
                        control={
                            <Checkbox
                                checked={twitchCookieChoice}
                                onChange={(event) => setTwitchCookieChoice(event.target.checked)}
                            />
                        }
                    />
                    <FormControlLabel
                        label="YouTube"
                        control={
                            <Checkbox
                                checked={setYoutubeChoice}
                                onChange={(event) => setYoutubeCookieChoice(event.target.checked)}
                            />
                        }
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleSave}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PrivacyAndCookiesModal
