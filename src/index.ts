import Client from "./client"
import ClientOptionsInterface from "./Interfaces/ClientOptionsInterface"
import Vue from 'vue'

export default {
    install (context: any, options: ClientOptionsInterface) {
        Vue.prototype.$apitator = new Client(options)
    }
}
