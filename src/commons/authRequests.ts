import axios, { AxiosRequestConfig } from "axios"
import { BACKEND_BASE_URL } from "../envConfig"

const axiosClient = axios.create({ withCredentials: true })

export const fetch = async <T>(endpoint: string, params?: AxiosRequestConfig["params"]) => {
    const res = await axiosClient.get<T>(`${BACKEND_BASE_URL}/${endpoint}`, {
        params,
    })

    return res
}
