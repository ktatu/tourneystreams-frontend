import { useSearchParams } from "react-router-dom"

const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const addStream = (channel: string) => {
        const newParams = searchParams

        if (!newParams.getAll("stream").includes(channel)) {
            newParams.append("stream", channel)
            setSearchParams(newParams.toString())
        }
    }

    const getStreams = (): string[] => {
        const streams = searchParams.getAll("stream")

        return streams
        //return parseParams(streams)
    }

    return {
        addStream,
        getStreams,
    }
}

// URLSearchParams only supports param format ?key=value1&key=value2
// Separate parsing so that ?key=value1,value2 format works
/*
const parseParams = (params: string[]): string[] => {
    if (params.length === 1) {
        return params[0].split(",")
    }
    return params
}*/

export default useQueryParams

/*
const serializeParams = (paramsArray: string[]) => {
    let query = "?"

}*/
