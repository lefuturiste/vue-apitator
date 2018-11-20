import Client from '../src/client'
import {AxiosError, AxiosResponse} from "axios";

describe('requests', () => {
    let client = new Client({
        baseUrl: "https://httpbin.org"
    });
    test('get', () => {
        client.get('/get?foo=bar', {
            headers: {
                'X-Foo': 'bar'
            }
        }).then((response: AxiosResponse) => {
            expect(response.status).toBe(200);
            expect(response.data.args).toEqual({foo: 'bar'});
            expect(response.data.headers['X-Foo']).toBe('bar');
            expect(client.isLoading).toBeFalsy()
        });
        expect(client.isLoading).toBeTruthy();
    });
    test('post', () => {
        client.post('/post', {
            foo: 'barred'
        }).then((response: AxiosResponse) => {
            expect(response.status).toBe(200);
            expect(response.data.json).toEqual({foo: 'barred'});
            expect(client.isLoading).toBeFalsy()
        })
    });
    test('get_error', () => {
        client.setGlobalCallbackOnError((error: AxiosError) => {
            if (error.response !== undefined) {
                expect(error.response.status).toBe(500)
            }
        });
        client.get('/status/500').catch((error: AxiosError) => {
            if (error.response !== undefined) {
                expect(error.response.status).toBe(500)
            }
            expect(client.isLoading).toBeFalsy()
        })
    });
    test('get_loading_type', () => {
        client.setGlobalCallbackOnLoading((isLoading: boolean, loadingType?: string) => {
            expect(loadingType).toBe('fooBar')
        });
        client.get('/status/200', { loadingType: 'fooBar' }).then((response: AxiosResponse) => {
            expect(response.status).toEqual(200);
        })
    });
    test('get_with_authorization', () => {
        client.setAuthorizationToken('FooBar');
        client.get('/get', { withAuth: true }).then((response: AxiosResponse) => {
            expect(response.data.headers.Authorization).toEqual('Bearer FooBar');
        })
    });
    test('put', () => {
        client.setAuthorizationToken('FooBar');
        client.put('/put', { foo: 'bar' }).then((response: AxiosResponse) => {
            expect(response.data.json.foo).toEqual('bar');
            expect(response.status).toEqual(200);
        })
    });
    test('delete', () => {
        client.setAuthorizationToken('FooBar');
        client.delete('/delete').then((response: AxiosResponse) => {
            expect(response.status).toEqual(200);
        })
    })
});
