import queryString from "query-string"

const useSearchParams = (searchParam: string) => {
    const getAll = () => {
        const searchParams = queryString.parse(location.search, { arrayFormat: "comma" })
        const streamsInParams = searchParams[searchParam]
        const validatedParams = validateSearchParams(streamsInParams)

        return validatedParams
    }

    const setParams = (params: Array<string>) => {
        const searchParams = queryString.parse(location.search)
        searchParams[searchParam] = params
        const newSearch = queryString.stringify(searchParams, { arrayFormat: "comma" })
        history.pushState(params, "", `${location.pathname}?${newSearch}`)
    }

    return { getAll, setParams }
}

const validateSearchParams = (streamsInParams: string | (string | null)[] | null) => {
    if (typeof streamsInParams === "string") {
        return [streamsInParams]
    }

    if (Array.isArray(streamsInParams)) {
        return streamsInParams.flatMap((param) => (param ? [param] : []))
    }

    return []
}

export default useSearchParams
