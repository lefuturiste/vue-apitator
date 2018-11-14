import Vue from 'vue'
import Client from "./client";
import ClientOptionsInterface from "./Interfaces/ClientOptionsInterface";

export default {
    install (context: Vue, options: ClientOptionsInterface): void {
        Vue.prototype.$apitator = new Client(options)
    }
}
