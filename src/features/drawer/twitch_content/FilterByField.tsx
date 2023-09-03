import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import CloseIcon from "@mui/icons-material/Close"
import { Box, IconButton, MenuItem, MenuList, TextField } from "@mui/material"
import { startTransition, useRef } from "react"
import PopupMenu, { PopupMenuClose } from "../../../commons/PopupMenu"
import { FilterBy } from "./hooks/useStreamsFilterAndSort"

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
            InputLabelProps={{ shrink: true }}
            label={`Filter by: ${filterType}`}
            sx={{ maxWidth: "200px" }}
            value={filterValue}
            InputProps={{
                endAdornment: (
                    <Box display="flex">
                        {filterValue ? (
                            <IconButton
                                sx={{
                                    visibility: filterValue ? "visible" : "hidden",
                                }}
                                onClick={() => setFilterValue("")}
                            >
                                <CloseIcon />
                            </IconButton>
                        ) : null}
                        <PopupMenu
                            ref={popupMenuRef}
                            buttonProps={{ buttonIcon: <ArrowDropDownIcon /> }}
                        >
                            <MenuList>
                                <MenuItem
                                    selected={filterType === "category"}
                                    onClick={() => handleFilterTypeChange("category")}
                                >
                                    category
                                </MenuItem>
                                <MenuItem
                                    selected={filterType === "channel name"}
                                    onClick={() => handleFilterTypeChange("channel name")}
                                >
                                    channel name
                                </MenuItem>
                                <MenuItem
                                    selected={filterType === "title"}
                                    onClick={() => handleFilterTypeChange("title")}
                                >
                                    stream title
                                </MenuItem>
                            </MenuList>
                        </PopupMenu>
                    </Box>
                ),
            }}
            onChange={handleFilterChange}
        />
    )
}

export default FilterByField
