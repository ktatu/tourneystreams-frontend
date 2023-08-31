import { TextField, MenuList, MenuItem, Box, IconButton } from "@mui/material"
import { startTransition, useRef } from "react"
import PopupMenu, { PopupMenuClose } from "../../../commons/PopupMenu"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import CloseIcon from "@mui/icons-material/Close"
import { FilterBy } from "./useStreamsFilterAndSort"

interface FilterByFieldProps {
    filterType: FilterBy
    filterValue: string
    setFilterType: (filterBy: FilterBy) => void
    setFilterValue: (value: string) => void
}

const FilterByField = ({
    filterType,
    filterValue,
    setFilterType,
    setFilterValue,
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
            sx={{ maxWidth: "200px" }}
            value={filterValue}
            InputProps={{
                endAdornment: (
                    <Box display="flex">
                        {filterValue ? (
                            <IconButton
                                onClick={() => setFilterValue("")}
                                sx={{
                                    visibility: filterValue ? "visible" : "hidden",
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        ) : null}
                        <PopupMenu
                            buttonProps={{ buttonIcon: <ArrowDropDownIcon /> }}
                            ref={popupMenuRef}
                        >
                            <MenuList>
                                <MenuItem
                                    onClick={() => handleFilterTypeChange("category")}
                                    selected={filterType === "category"}
                                >
                                    category
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleFilterTypeChange("channel name")}
                                    selected={filterType === "channel name"}
                                >
                                    channel name
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleFilterTypeChange("title")}
                                    selected={filterType === "title"}
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
