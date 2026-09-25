// AI-generated refactor by GitHub Copilot (Claude Sonnet 4.5): made SortBySelect generic and driven by a sortOptions list instead of the hardcoded SortBy type.
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

export interface SortOption<T extends string> {
    label: string
    value: T
}

interface SortBySelectProps<T extends string> {
    setSortValue: (sortBy: T) => void
    sortOptions: Array<SortOption<T>>
    sortValue: T
}

const SortBySelect = <T extends string>({
    setSortValue,
    sortOptions,
    sortValue,
}: SortBySelectProps<T>) => {
    const handleSortByChange = (event: SelectChangeEvent) => {
        setSortValue(event.target.value as T)
    }

    return (
        <FormControl sx={{ minWidth: "100px" }}>
            <InputLabel>Sort by</InputLabel>
            <Select
                label="Sort by"
                value={sortValue}
                onChange={handleSortByChange}
            >
                {sortOptions.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SortBySelect
