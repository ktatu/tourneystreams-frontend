import { PaletteColorOptions, useMediaQuery } from "@mui/material"
import { createTheme, ThemeOptions } from "@mui/material/styles"
import { useMemo } from "react"

declare module "@mui/material/styles" {
    interface Palette {
        viewerCount: Palette["primary"]
    }

    interface PaletteOptions {
        viewerCount: PaletteOptions["primary"]
    }
}

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#9851d6",
        },
        secondary: {
            main: "#F75750",
        },
        background: {
            paper: "#2e2f31",
            default: "#191c1e",
        },
        text: {
            primary: "#ffffff",
        },
        viewerCount: {
            main: "#F75750",
        },
    },
})

export default theme

/*
const theme = (darkMode: boolean) => {
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

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#9851d6",
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
            viewerCount: {
                main: "#F75750",
            },
        },
    })

    return darkTheme
}*/
