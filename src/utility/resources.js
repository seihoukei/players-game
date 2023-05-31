import Trigger from "utility/trigger-svelte.js"

export default class Resources {
    static gain(name, amount) {
        Trigger("command-gain-resource", name, amount)
    }
    
    static set(name, value) {
        Trigger("command-set-resource", name, value)
    }
    
    static reset(name) {
        Trigger("command-reset-resource", name)
    }
}
