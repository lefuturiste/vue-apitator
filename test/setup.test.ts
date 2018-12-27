import Client from '../src/client'
import ClientWrapper from '../src/index'
import Vue from 'vue'

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
        let baseUrl = "https://example.com";
        let defaultToken = "test";
        let client = new Client({baseUrl: baseUrl, defaultToken: defaultToken});
        expect(client.getApiBaseUrl()).toBe(baseUrl);
        expect(client.getAuthorizationToken()).toBe(defaultToken)
    });
});
