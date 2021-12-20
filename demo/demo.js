const Apitator = require('../dist/client').default

let client = new Apitator({
    baseUrl: 'https://jsonplaceholder.typicode.com'
})

client.get('/users').then(async res => {
    console.log(await res.json())
})