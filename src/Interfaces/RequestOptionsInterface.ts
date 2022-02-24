import { AxiosRequestConfig } from 'axios'

export default interface RequestOptionsInterface {
    withAuth?: boolean
    keepLoading?: boolean
    loadingType?: string
    loading?: boolean
    body?: object
    maxHttpErrors?: number
    alertOnError?: boolean,
    headers?: Record<string, string>,
    params?: object,
    axiosConfig?: AxiosRequestConfig
}
