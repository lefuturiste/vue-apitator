import Client from '../src/client'
import {AxiosError, AxiosResponse} from "axios";

describe('requests', () => {
    let client = new Client({
        baseUrl: "https://httpbin.org"
    });
    test('get', () => {
        return new Promise((resolve) => {
            client.get('/get?foo=bar', {
                headers: {
                    'X-Foo': 'bar'
                }
            }).then((response: AxiosResponse) => {
                expect(response.status).toBe(200);
                expect(response.data.args).toEqual({foo: 'bar'});
                expect(response.data.headers['X-Foo']).toBe('bar');
                expect(client.isLoading).toBeFalsy();
                resolve();
            });
            expect(client.isLoading).toBeTruthy();
        })
    });
    test('post', () => {
        return new Promise(resolve => {
            client.post('/post', {
                foo: 'barred'
            }).then((response: AxiosResponse) => {
                expect(response.status).toBe(200);
                expect(response.data.json).toEqual({foo: 'barred'});
                expect(client.isLoading).toBeFalsy();
                resolve();
            })
        })
    });
    test('get_error', () => {
        return new Promise(resolve => {
            client.setGlobalCallbackOnError((error: AxiosError) => {
                if (error.response !== undefined) {
                    expect(error.response.status).toBe(500)
                }
            });
            client.get('/status/500').catch((error: AxiosError) => {
                if (error.response !== undefined) {
                    expect(error.response.status).toBe(500)
                }
                expect(client.isLoading).toBeFalsy();
                resolve()
            })
        })
    });
    test('get_with_authorization', () => {
        return new Promise(resolve => {
            client.setAuthorizationToken('FooBar');
            client.get('/get', { withAuth: true }).then((response: AxiosResponse) => {
                expect(response.data.headers.Authorization).toEqual('Bearer FooBar');
                resolve();
            })
        })
    });
    test('get_loading_type', () => {
        return new Promise(resolve => {
            client.clearGlobalCallbacks();
            client.setGlobalCallbackOnLoading((isLoading: boolean, loadingType?: string) => {
                expect(isLoading).toBeTruthy();
                expect(loadingType).toBe('fooBar')
            });
            client.get('/status/200', { loadingType: 'fooBar', keepLoading: true }).then((response: AxiosResponse) => {
                expect(client.loadingType).toEqual('fooBar');
                expect(client.isLoading).toBeTruthy();
                expect(response.status).toEqual(200);
                resolve()
            }).catch((error) => {
                console.log(error);
                console.log('ERROR');
                resolve()
            });
            expect(client.loadingType).toEqual('fooBar');
        })
    });
    test('get_loading_type_2', () => {
        return new Promise(resolve => {
            client.clearGlobalCallbacks();
            client.get('/status/200', { loadingType: 'fooBar' }).then((response: AxiosResponse) => {
                expect(client.loadingType).toEqual('normal');
                expect(client.isLoading).toBeFalsy();
                expect(response.status).toEqual(200);
                resolve()
            }).catch((error) => {
                console.log(error);
                console.log('ERROR');
                resolve()
            });
            expect(client.loadingType).toEqual('fooBar');
        })
    });
    test('get_with_loading', () => {
        return new Promise(resolve => {
            client.clearGlobalCallbacks();
            client.setGlobalCallbackOnLoading((isLoading: boolean, loadingType?: string) => {
                expect(isLoading).toBeTruthy();
                expect(loadingType).toEqual('normal')
            });
            client.get('/get', { loading: true }).then((response: AxiosResponse) => {
                expect(response.status).toEqual(200);
                expect(client.isLoading).toBeFalsy();
                resolve()
            }).catch((error) => {
                console.log(error);
                console.log('ERROR');
                resolve()
            });
            client.setGlobalCallbackOnLoading(() => {});
            expect(client.isLoading).toBeTruthy();
        })
    });
    test('get_without_loading', () => {
        return new Promise((resolve, reject) => {
            client.clearGlobalCallbacks();
            client.setGlobalCallbackOnLoading((isLoading: boolean, loadingType?: string) => {
                expect(isLoading).toBeFalsy();
                expect(loadingType).toBe('normal')
            });
            client.get('/get', { loading: false }).then((response: AxiosResponse) => {
                expect(response.status).toEqual(200);
                expect(client.isLoading).toBeFalsy();
                resolve();
            }).catch((error) => {
                console.log(error);
                console.log('ERROR');
                reject();
            });
            expect(client.isLoading).toBeFalsy();
        })
    });
    test('get_keep_loading', () => {
        return new Promise((resolve, reject) => {
            client.clearGlobalCallbacks();
            client.setGlobalCallbackOnLoading((isLoading: boolean, loadingType?: string) => {
                expect(isLoading).toBeTruthy();
                expect(loadingType).toBe('normal')
            });
            client.get('/get', { keepLoading: true }).then((response: AxiosResponse) => {
                expect(response.status).toEqual(200);
                expect(client.isLoading).toBeTruthy();
                resolve();
            }).catch((error) => {
                expect(client.isLoading).toBeTruthy();
                console.log(error);
                console.log('ERROR');
                reject();
            });
            expect(client.isLoading).toBeTruthy();
        })

    });
    test('put', () => {
        return new Promise((resolve) => {
            client.clearGlobalCallbacks();
            client.setAuthorizationToken('FooBar');
            client.put('/put', { foo: 'bar' }).then((response: AxiosResponse) => {
                expect(response.data.json.foo).toEqual('bar');
                expect(response.status).toEqual(200);
                resolve()
            })
        })
    });
    test('delete', () => {
        return new Promise(resolve => {
            client.setAuthorizationToken('FooBar');
            client.delete('/delete').then((response: AxiosResponse) => {
                expect(response.status).toEqual(200);
                resolve()
            })
        })
    })
});
