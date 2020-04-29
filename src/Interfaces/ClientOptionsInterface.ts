import {AxiosError} from "axios"

export default interface ClientOptionsInterface {
    baseUrl: string
    // access_token or basic_auth
    authType?: string
    // the access token or the basic auth scheme header
    authDefaultHeader?: string
    withCSRFToken?: boolean
    CSRFSecret?: string
    maxHttpErrors?: number
    alertOnError?: boolean
    globalCallbackOnError?: (error: AxiosError) => void
    globalCallbackOnLoading?: (isLoading: boolean, loadingType?: string) => void
    graphQLPath?: string
    defaultToken?: string
}
