import HttpClient, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import RequestOptionsInterface from "./Interfaces/RequestOptionsInterface";
import ClientOptionsInterface from "./Interfaces/ClientOptionsInterface";

export default class client {
    public isLoading: boolean = false;
    public loadingType: string = '';
    private options: ClientOptionsInterface;
    public authorizationToken: string = '';
    private authorizationHeader: string = '';
    public httpErrors: number = 0;

    constructor(options: ClientOptionsInterface) {
        this.options = options;
    }

    public getApiBaseUrl(): string {
        return this.options.baseUrl
    }

    public setAuthorizationToken(token: string) {
        this.authorizationToken = token;
        this.authorizationHeader = 'Bearer ' + token
    }

    private toggleLoading() {
        this.isLoading = !this.isLoading;
        if (this.options.globalCallbackOnLoading !== undefined) {
            this.options.globalCallbackOnLoading(this.isLoading, this.loadingType)
        }
    }

    private resetLoadingState(options: RequestOptionsInterface): void {
        this.httpErrors = 0;
        if (options.keepLoading === undefined || options.keepLoading === false) {
            this.toggleLoading();
        }
        this.loadingType = 'normal';
    }

    public request(method: string, path: string, options: RequestOptionsInterface = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            if (options.loadingType !== '' && options.loadingType !== undefined) {
                this.loadingType = options.loadingType
            }
            this.toggleLoading();
            let requestConfig: AxiosRequestConfig = {
                method: method,
                url: this.options.baseUrl + path,
                headers: {}
            };
            requestConfig.headers = options.headers == undefined ? {} : options.headers;
            if (options.body !== undefined) {
                requestConfig.data = options.body
            }
            if (options.withAuth) {
                requestConfig.headers.Authorization = this.authorizationHeader
            }
            let maxHttpErrors = this.options.maxHttpErrors == undefined ? options.maxHttpErrors == undefined ? 0 : options.maxHttpErrors : this.options.maxHttpErrors;
            let alertOnError = this.options.alertOnError == undefined ? options.alertOnError == undefined ? true : options.alertOnError : this.options.alertOnError;
            HttpClient.request(requestConfig).then((response: AxiosResponse) => {
                this.resetLoadingState(options);
                return resolve(response)
            }).catch((error: AxiosError) => {
                if (this.httpErrors >= maxHttpErrors) {
                    // end of this loop
                    if (alertOnError && this.options.globalCallbackOnError !== undefined) {
                        this.options.globalCallbackOnError(error)
                    }
                    this.resetLoadingState(options);
                    return reject(error)
                }
                this.httpErrors++;
                return this.request(method, path, options)
            })
        })
    }

    public get(path: string, options: RequestOptionsInterface = {}): Promise<any> {
        return this.request('GET', path, options)
    }

    public post(path: string, body: object, options: RequestOptionsInterface = {}): Promise<any> {
        options.body = body;
        return this.request('POST', path, options)
    }

    public put(path: string, body: object, options: RequestOptionsInterface = {}): Promise<any> {
        options.body = body;
        return this.request('PUT', path, options)
    }

    public delete(path: string, options: RequestOptionsInterface = {}): Promise<any> {
        return this.request('DELETE', path, options)
    }

    public graphQL(query: string, variables: object = {}, options: RequestOptionsInterface = {}): Promise<any> {
        let path = this.options.graphQLPath == undefined ? '/' : this.options.graphQLPath;
        options.body = {
            query: query,
            variables: variables
        };
        return this.request('POST', path, options)
    }

    public setGlobalCallbackOnError(callback: (error: AxiosError) => void) {
        this.options.globalCallbackOnError = callback
    }

    public setGlobalCallbackOnLoading(callback: (isLoading: boolean, loadingType?: string) => void) {
        this.options.globalCallbackOnLoading = callback
    }
}
