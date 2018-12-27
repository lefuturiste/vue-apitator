import Client from '../src/client'
import ClientWrapper from '../src/index'
import Vue from 'vue'
import {AxiosResponse} from "axios";

describe('setup', () => {
    test('vue_setup', () => {
        ClientWrapper.install(new Vue, {baseUrl: 'https://example.com'});
    });
    test('test_base_url', () => {
        let baseUrl = "https://example.com";
        let client = new Client({baseUrl: baseUrl});
        expect(client.getApiBaseUrl()).toBe(baseUrl)
    });
    test('test_default_token', () => {
        let baseUrl = "https://httpbin.org";
        let defaultToken = "test";
        let client = new Client({baseUrl: baseUrl, defaultToken: defaultToken});
        client.get('/get', {withAuth: true}).then((response: AxiosResponse) => {
            expect(response.status).toBe(200);
            expect(response.data.headers['Authorization']).toBe('Bearer ' + defaultToken);
        });
        expect(client.getApiBaseUrl()).toBe(baseUrl);
        expect(client.getAuthorizationToken()).toBe(defaultToken);
    });
});
