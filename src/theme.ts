import { createTheme } from "@mui/material/styles"

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
