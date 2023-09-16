import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { useState } from "react"

const GameToggleGroup = () => {
    const [toggleValue, setToggleValue] = useState("all")

    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
        if (!newValue) {
            return
        }

        setToggleValue(newValue)
    }

    return (
        <ToggleButtonGroup
            color="primary"
            exclusive
            onChange={handleChange}
            value={toggleValue}
        >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="counter-strike">Counter-Strike</ToggleButton>
            <ToggleButton value="dota2">Dota 2</ToggleButton>
        </ToggleButtonGroup>
    )
}

export default GameToggleGroup
