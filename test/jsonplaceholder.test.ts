import Client from '../src/client'
import {AxiosResponse} from "axios";

describe('requests', () => {
    let client = new Client({baseUrl: "https://jsonplaceholder.typicode.com"});
    test('get', () => {
        client.get('/users').then((response: AxiosResponse) => {
            console.log(response.data);
            expect(response.status).toBe(200);
            expect(response.data.length).toBeDefined();
            expect(response.data.length).toBeGreaterThan(0);
            expect(client.isLoading).toBeFalsy()
        });
        expect(client.isLoading).toBeTruthy();
    });
    test('post', () => {
        client.post('/users', {
            name: 'foo',
            username: 'bar',
            email: 'email@example.com'
        }).then((response: AxiosResponse) => {
            expect(response.status).toBe(201);
            expect(response.data.id).toBeDefined();
            expect(client.isLoading).toBeFalsy()
        });
        expect(client.isLoading).toBeTruthy();
    });
});
