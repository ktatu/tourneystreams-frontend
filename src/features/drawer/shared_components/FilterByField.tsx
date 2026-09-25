// AI-generated refactor by GitHub Copilot (Claude Sonnet 4.5): made FilterByField generic and driven by a filterOptions list instead of the hardcoded FilterBy type.
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import CloseIcon from "@mui/icons-material/Close"
import { Box, IconButton, MenuItem, MenuList, TextField } from "@mui/material"
import { startTransition, useRef } from "react"
import PopupMenu, { PopupMenuClose } from "./PopupMenu"

export interface FilterOption<T extends string> {
    label: string
    value: T
}

interface FilterByFieldProps<T extends string> {
    filterOptions: Array<FilterOption<T>>
    filterType: T
    filterValue: string
    setFilterType: (filterBy: T) => void
    setFilterValue: (value: string) => void
}

const FilterByField = <T extends string>({
    filterOptions,
    filterType,
    filterValue,
    setFilterType,
    setFilterValue,
}: FilterByFieldProps<T>) => {
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setFilterValue(event.target.value)
        })
    }

    const handleFilterTypeChange = (newFilterType: T) => {
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
                                {filterOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        selected={filterType === option.value}
                                        onClick={() => handleFilterTypeChange(option.value)}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
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
