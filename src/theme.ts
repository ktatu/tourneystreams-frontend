import { createTheme, ThemeOptions } from "@mui/material/styles"

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

const theme = createTheme(darkTheme)

export default theme
