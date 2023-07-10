import { TextField, MenuList, MenuItem, Box, IconButton } from "@mui/material"
import { startTransition, useRef } from "react"
import { FilterBy } from "."
import PopupMenu, { PopupMenuClose } from "../../../commons/PopupMenu"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import CloseIcon from "@mui/icons-material/Close"

interface FilterByFieldProps {
    filterValue: string
    setFilterValue: (value: string) => void
    filterType: FilterBy
    setFilterType: (filterBy: FilterBy) => void
}

const FilterByField = ({
    filterValue,
    setFilterValue,
    filterType,
    setFilterType,
}: FilterByFieldProps) => {
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setFilterValue(event.target.value)
        })
    }

    const handleFilterTypeChange = (newFilterType: FilterBy) => {
        setFilterType(newFilterType)
        if (popupMenuRef.current) {
            popupMenuRef.current.handleClose()
        }
    }

    const popupMenuRef = useRef<PopupMenuClose | null>(null)

    return (
        <TextField
            autoComplete="off"
            label={`Filter by: ${filterType}`}
            InputLabelProps={{ shrink: true }}
            onChange={handleFilterChange}
            value={filterValue}
            sx={{ maxWidth: "200px" }}
            InputProps={{
                endAdornment: (
                    <Box display="flex">
                        <IconButton
                            onClick={() => setFilterValue("")}
                            sx={{
                                visibility: filterValue ? "visible" : "hidden",
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <PopupMenu
                            buttonProps={{ buttonIcon: <ArrowDropDownIcon /> }}
                            ref={popupMenuRef}
                        >
                            <MenuList>
                                <MenuItem
                                    onClick={() => handleFilterTypeChange(FilterBy.Category)}
                                    selected={filterType === FilterBy.Category}
                                >
                                    category
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleFilterTypeChange(FilterBy.ChannelName)}
                                    selected={filterType === FilterBy.ChannelName}
                                >
                                    channel name
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleFilterTypeChange(FilterBy.Title)}
                                    selected={filterType === FilterBy.Title}
                                >
                                    stream title
                                </MenuItem>
                            </MenuList>
                        </PopupMenu>
                    </Box>
                ),
            }}
        />
    )
}

export default FilterByField
