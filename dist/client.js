"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class client {
    constructor(options) {
        this.isLoading = false;
        this.loadingType = '';
        this.authorizationToken = '';
        this.authorizationHeader = '';
        this.httpErrors = 0;
        this.options = options;
    }
    getApiBaseUrl() {
        return this.options.baseUrl;
    }
    setAuthorizationToken(token) {
        this.authorizationToken = token;
        this.authorizationHeader = 'Bearer ' + token;
    }
    toggleLoading() {
        this.isLoading = !this.isLoading;
        if (this.options.globalCallbackOnLoading !== undefined) {
            this.options.globalCallbackOnLoading(this.isLoading, this.loadingType);
        }
    }
    resetLoadingState(options) {
        this.httpErrors = 0;
        if (options.keepLoading === undefined || options.keepLoading === false) {
            this.toggleLoading();
        }
        this.loadingType = 'normal';
    }
    request(method, path, options = {}) {
        return new Promise((resolve, reject) => {
            if (options.loadingType !== '' && options.loadingType !== undefined) {
                this.loadingType = options.loadingType;
            }
            this.toggleLoading();
            let requestConfig = {
                method: method,
                url: this.options.baseUrl + path,
                headers: {}
            };
            requestConfig.headers = options.headers == undefined ? {} : options.headers;
            if (options.body !== undefined) {
                requestConfig.data = options.body;
            }
            if (options.withAuth) {
                requestConfig.headers.Authorization = this.authorizationHeader;
            }
            let maxHttpErrors = this.options.maxHttpErrors == undefined ? options.maxHttpErrors == undefined ? 0 : options.maxHttpErrors : this.options.maxHttpErrors;
            let alertOnError = this.options.alertOnError == undefined ? options.alertOnError == undefined ? true : options.alertOnError : this.options.alertOnError;
            axios_1.default.request(requestConfig).then((response) => {
                this.resetLoadingState(options);
                return resolve(response);
            }).catch((error) => {
                if (this.httpErrors >= maxHttpErrors) {
                    // end of this loop
                    if (alertOnError && this.options.globalCallbackOnError !== undefined) {
                        this.options.globalCallbackOnError(error);
                    }
                    this.resetLoadingState(options);
                    return reject(error);
                }
                this.httpErrors++;
                return this.request(method, path, options);
            });
        });
    }
    get(path, options = {}) {
        return this.request('GET', path, options);
    }
    post(path, body, options = {}) {
        options.body = body;
        return this.request('POST', path, options);
    }
    put(path, body, options = {}) {
        options.body = body;
        return this.request('PUT', path, options);
    }
    delete(path, options = {}) {
        return this.request('DELETE', path, options);
    }
    graphQL(query, variables = {}, options = {}) {
        let path = this.options.graphQLPath == undefined ? '/' : this.options.graphQLPath;
        options.body = {
            query: query,
            variables: variables
        };
        return this.request('POST', path, options);
    }
    setGlobalCallbackOnError(callback) {
        this.options.globalCallbackOnError = callback;
    }
    setGlobalCallbackOnLoading(callback) {
        this.options.globalCallbackOnLoading = callback;
    }
}
exports.default = client;
