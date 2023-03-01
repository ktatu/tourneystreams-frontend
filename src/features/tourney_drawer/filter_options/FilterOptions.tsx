import AllGames from "./AllGamesOptions"
import "../TourneyDrawer.css"
import { Box } from "@mui/material"
import ApexLegendsOptions from "./ApexLegendsOptions"

const FilterOptions = ({ selectedIndex }: { selectedIndex: number }) => {
    return (
        <Box className="drawer-container">
            <div hidden={selectedIndex !== 0}>
                <AllGames />
            </div>
            <div hidden={selectedIndex !== 1}>
                <ApexLegendsOptions />
            </div>
        </Box>
    )
}

export default FilterOptions
