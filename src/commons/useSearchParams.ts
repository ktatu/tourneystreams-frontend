import queryString from "query-string"

const useSearchParams = (searchParamKey: string) => {
    const getAll = () => {
        return getValidatedSearchParamValues(searchParamKey)
    }

    const addToParams = (newParamValue: string) => {
        const paramValues = getValidatedSearchParamValues(searchParamKey)

        setParams(paramValues.concat(newParamValue))
    }

    const removeFromParams = (paramValueToRemove: string) => {
        const paramValues = getValidatedSearchParamValues(searchParamKey)

        setParams(paramValues.filter((paramValue) => paramValue !== paramValueToRemove))
    }

    const setParams = (modifiedParam: Array<string>) => {
        const searchParams = queryString.parse(location.search)
        searchParams[searchParamKey] = modifiedParam
        const newSearch = queryString.stringify(searchParams, { arrayFormat: "comma" })
        history.pushState(modifiedParam, "", `${location.pathname}?${newSearch}`)
    }

    return { getAll, addToParams, removeFromParams }
}

const getValidatedSearchParamValues = (searchParamKey: string): string[] => {
    const searchParams = queryString.parse(location.search, { arrayFormat: "comma" })
    const valuesInParams = searchParams[searchParamKey]

    if (typeof valuesInParams === "string") {
        return [valuesInParams]
    }

    if (Array.isArray(valuesInParams)) {
        return valuesInParams.flatMap((param) => (param ? [param] : []))
    }

    return []
}

export default useSearchParams
