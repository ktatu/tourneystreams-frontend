import { useMediaQuery } from "@mui/material"
import { createTheme, ThemeOptions } from "@mui/material/styles"
import { useMemo } from "react"
import User from "./user"

const theme = (user: User) => {
    const lightTheme: ThemeOptions = {
        palette: {
            mode: "light",
            primary: {
                main: "#3f51b5",
            },
            secondary: {
                main: "#f50057",
            },
            divider: "rgba(255,181,181,0.12)",
            background: {
                paper: "#FDF7F7",
            },
        },
    }

    const darkTheme: ThemeOptions = {
        palette: {
            mode: "dark",
            primary: {
                main: "#3f51b5",
            },
            secondary: {
                main: "#f50057",
            },
            background: {
                paper: "#2e2f31",
                default: "#191c1e",
            },
            text: {
                primary: "#ffffff",
            },
        },
    }

    if (user.colorModePreference === "UNKNOWN" || user.colorModePreference === "DARK") {
        return createTheme(darkTheme)
    }
    return createTheme(lightTheme)
}

export default theme
