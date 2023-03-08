/*
const useQueryParams = (key: string) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const addValue = (value: string) => {
        const newParams = searchParams

        if (!newParams.getAll(key).includes(value)) {
            newParams.append(key, value)
            setSearchParams(newParams.toString())
        }
    }

    const getValuesAsArray = (): string[] => {
        const values = searchParams.getAll("channel")

        return values
    }

    const getValuesAsQueryString = () => {
        return searchParams.toString()
    }

    const removeValue = (valueToRemove: string) => {
        const params = searchParams
        let valuesInSearchParams = params.getAll(key)

        valuesInSearchParams = valuesInSearchParams.filter(
            (valueInParams) => valueInParams !== valueToRemove
        )
        params.delete(key)
        valuesInSearchParams.forEach((value) => params.append(key, value))

        setSearchParams(params.toString())
    }

    return {
        addValue,
        getValuesAsArray,
        getValuesAsQueryString,
        removeValue,
    }
}

export default useQueryParams*/

const useQueryParams = (key: string) => {
    return {
        addValue: (key: string) => null,
        getValuesAsArray: () => ["imaqtpie"],
        getValuesAsQueryString: () => null,
        removeValue: (key: string) => null,
    }
}

export default useQueryParams
