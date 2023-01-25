import { useState } from "react"

const useCheckbox = () => {
    const [checked, setChecked] = useState(true)

    const handleToggle = () => {
        setChecked(!checked)
    }

    return {
        checked,
        handleToggle,
    }
}

export default useCheckbox
