import { useEffect, useState } from "react"

const useFilterOptions = (optionType: string, defaultFilterValues: Array<string>) => {
    const [filterValues, setFilterValues] = useState<Array<string>>([])

    useEffect(() => {
        const savedFilterValues = localStorage.getItem(optionType)

        if (savedFilterValues) {
            setFilterValues(JSON.parse(savedFilterValues))
        } else {
            setFilterValues(defaultFilterValues)
        }
    }, [])

    useEffect(() => {
        // Preventing putting an empty array into localStorage on first render
        if (filterValues.length === 0) {
            return
        }
        localStorage.setItem(optionType, JSON.stringify(filterValues))
    }, [filterValues])

    const getAll = () => {
        return filterValues
    }

    const handleChange = (filterValue: string) =>
        filterValues.includes(filterValue) ? remove(filterValue) : add(filterValue)

    const add = (filterValue: string) => setFilterValues(filterValues.concat(filterValue))

    const remove = (valueToRemove: string) => {
        if (filterValues.length > 1) {
            setFilterValues(filterValues.filter((savedValue) => savedValue !== valueToRemove))
        }
    }

    return {
        getAll,
        handleChange,
    }
}

export default useFilterOptions
