import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material"
import { SortBy } from "."

interface SortBySelectProps {
    sortValue: SortBy
    setSortValue: (sortBy: SortBy) => void
}

const SortBySelect = ({ sortValue, setSortValue }: SortBySelectProps) => {
    const handleSortByChange = (event: SelectChangeEvent) => {
        switch (event.target.value) {
            case "viewer count":
                setSortValue(SortBy.ViewerCount)
                break
            case "category":
                setSortValue(SortBy.Category)
                break
            default:
                setSortValue(SortBy.ViewerCount)
        }
    }

    return (
        <>
            <FormControl sx={{ minWidth: "100px" }}>
                <InputLabel>Sort by</InputLabel>
                <Select
                    label="Sort by"
                    onChange={handleSortByChange}
                    value={sortValue}
                >
                    <MenuItem value={SortBy.Category}>category</MenuItem>
                    <MenuItem value={SortBy.ViewerCount}>viewer count</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default SortBySelect
