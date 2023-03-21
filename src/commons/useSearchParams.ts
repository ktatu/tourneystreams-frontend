import queryString from "query-string"

const useSearchParams = (searchParam: string) => {
    const getAll = () => {
        const searchParams = queryString.parse(location.search)
        return searchParams[searchParam]
    }

    const setParams = (params: Array<string>) => {
        const searchParams = queryString.parse(location.search)
        searchParams[searchParam] = params
        const newSearch = queryString.stringify(searchParams)
        history.pushState(params, "", `${location.pathname}?${newSearch}`)
    }

    return { getAll, setParams }
}

export default useSearchParams
