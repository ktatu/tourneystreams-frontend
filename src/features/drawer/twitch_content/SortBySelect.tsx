import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material"
import { SortBy } from "./useStreamsFilterAndSort"

interface SortBySelectProps {
    sortValue: SortBy
    setSortValue: (sortBy: SortBy) => void
}

const SortBySelect = ({ sortValue, setSortValue }: SortBySelectProps) => {
    const handleSortByChange = (event: SelectChangeEvent) => {
        switch (event.target.value) {
            case "viewer count":
                setSortValue("viewerCount")
                break
            case "category":
                setSortValue("category")
                break
            default:
                setSortValue("viewerCount")
        }
    }

    return (
        <>
            <FormControl sx={{ minWidth: "100px" }}>
                <InputLabel>Sort by</InputLabel>
                <Select
                    label="Sort by"
                    value={sortValue}
                    onChange={handleSortByChange}
                >
                    <MenuItem value="category">category</MenuItem>
                    <MenuItem value="viewerCount">viewer count</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default SortBySelect
