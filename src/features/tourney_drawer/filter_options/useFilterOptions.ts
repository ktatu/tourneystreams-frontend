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

    const add = (filterValue: string) => setFilterValues(filterValues.concat(filterValue))

    const remove = (valueToRemove: string) =>
        setFilterValues(filterValues.filter((savedValue) => savedValue !== valueToRemove))

    const getAll = () => {
        return filterValues
    }

    return {
        add,
        getAll,
        remove,
    }
}

export default useFilterOptions
