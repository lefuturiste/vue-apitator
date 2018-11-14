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
    })
});
