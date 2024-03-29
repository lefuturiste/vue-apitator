# Vue-Apitator

![Unit test workflow](https://github.com/lefuturiste/vue-apitator/actions/workflows/tests.yml/badge.svg)

A simple way to query your REST or your GraphQL API in your Vue.js app

## Installation

`npm install --save vue-apitator`

or

`yarn add vue-apitator`

## Usage

in your main.js:

```js
import Apitator from 'apitator'
Vue.use(Apitator, {
  baseUrl: 'https://example.com/api'
})
```

in your vue component:

```js
this.$apitator.get('/users').then(response => {
  console.log(response.data)
})
```

## Test

Test with jest, execute with:

`npm run test`

or, to watch:

`npm run test-watch`

## Contribution

You can contribute to apitator by forking this repository and pull request your changes. This lib is written in typescript, you can use `npm run dev` to start adding features!

If you have any problems with this library, feel free to create an issue!
